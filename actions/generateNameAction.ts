"use server"; // This tells Next.js: "Run this code ONLY on the server"
import { generateName } from "@/lib/generateName";

export async function handleGenerate(_prevState: string | null, formData: FormData) {
  const text = (formData.get("text") as string | null)?.trim() ?? "";
  const industry = (formData.get("industry") as string | null) ?? "General";
  const tone = (formData.get("tone") as string | null) ?? "Professional";
  const countInput = formData.get("count");
  const parsedCount = countInput ? parseInt(countInput as string, 10) : 1;
  const count = Number.isNaN(parsedCount) ? 1 : parsedCount;
  const lengthInput = formData.get("length");
  const parsedLength = lengthInput ? parseInt(lengthInput as string, 10) : 5;
  const length = Number.isNaN(parsedLength) ? 5 : parsedLength;

  if (!text) {
    return "Please provide a business description before generating names.";
  }

  try {
    const summary = await generateName(text, { industry, tone, length, count });
    return summary;
  } catch (error) {
    console.error(error);
    return "An error occurred while generating the name. Please try again.";
  }
}
