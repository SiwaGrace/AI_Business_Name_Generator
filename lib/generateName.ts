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

// Change return type from Promise<string> to Promise<string[]>
export async function generateName(
  text: string,
  options: GenerateOptions = {},
): Promise<string[]> {
  const {
    industry = "General",
    tone = "Professional",
    length = 5,
    count = 1,
    retries = 5,
    delay = 1000,
  } = options;

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  if (!text?.trim()) throw new Error("Text is required and cannot be empty");

  const prompt = `Please provide exactly ${length} concise and unique names for the following content:
  Content: ${text}
  Industry: ${industry}
  Tone: ${tone}
  Target Words: Around ${count} words per name.
  Format: Return ONLY a comma-separated list of names.
  - No brackets
  - No JSON
  - No explanations
  - No extra text
  Example: Name One, Name Two, Name Three`;

  try {
    const result = await model.generateContent(prompt);
    console.log("Raw response from Gemini:", await result.response.text()); // Log raw response for debugging
    const raw = result.response.text();

    // Parse comma-separated string into clean array
    const names = raw
      .replace(/```json|```/g, "")
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean);

    return names;
  } catch (error: unknown) {
    const status =
      typeof error === "object" && error !== null && "status" in error
        ? (error as { status: number }).status
        : undefined;

    if (
      retries > 0 &&
      (status === 429 || (typeof status === "number" && status >= 500))
    ) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return generateName(text, {
        ...options,
        retries: retries - 1,
        delay: delay * 2,
      });
    }

    throw error;
  }
}
