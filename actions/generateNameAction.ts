"use server"; // This tells Next.js: "Run this code ONLY on the server"
import { generateName } from "@/lib/generateName";

export async function handleGenerate(prevState: any, formData: FormData) {
  const text = formData.get("text") as string;
  const industry = formData.get("industry") as string;
  const tone = formData.get("tone") as string;
  const countInput = formData.get("count");
  const count = countInput ? parseInt(countInput as string, 10) : 1;
  const lengthInput = formData.get("length");
  const length = lengthInput ? parseInt(lengthInput as string, 10) : 5;

  try {
    const summary = await generateName(text, { industry, tone, length, count });
    return summary;
  } catch (error) {
    console.error(error);
    return "An error occurred while generating the name. Please try again.";
  }
}
