import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Create an interface for better Type Safety
interface GenerateOptions {
  industry?: string;
  tone?: string;
  length?: number;
  count?: number;
  retries?: number;
  delay?: number;
}

export async function generateName(
  text: string,
  options: GenerateOptions = {}, // Use an object for optional params
): Promise<string> {
  // Destructure with default values
  const {
    industry = "General",
    tone = "Professional",
    length = 1,
    count = 1,
    retries = 5,
    delay = 1000,
  } = options;

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  if (!text || !text.trim()) {
    throw new Error("Text is required and cannot be empty");
  }

  const prompt = `Please provide exactly ${length} concise and unique name for the following content:
  Content: ${text}
  Industry: ${industry}
  Tone: ${tone}
 Target Words: Around ${count} words per name.
  Format: Return the names as a numbered list.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: unknown) {
    const status =
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      typeof (error as { status?: unknown }).status === "number"
        ? (error as { status: number }).status
        : undefined;

    const message =
      error instanceof Error
        ? error.message
        : typeof error === "string"
          ? error
          : "Unknown error";

    if (retries > 0 && (status === 429 || (typeof status === "number" && status >= 500))) {
      console.log(
        `⚠️ Request failed. Retrying in ${delay}ms... (${retries} retries left)`,
      );

      await new Promise((resolve) => setTimeout(resolve, delay));

      // Now the recursion is clean!
      return generateName(text, {
        ...options,
        retries: retries - 1,
        delay: delay * 2,
      });
    }

    console.error("❌ Gemini Error:", message);
    throw error;
  }
}
