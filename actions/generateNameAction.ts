"use server";
import { generateName } from "@/lib/generateName";

export type GenerateResult = string[] | string;

export async function handleGenerate(
  _prevState: GenerateResult | null,
  formData: FormData,
): Promise<GenerateResult> {
  const text = (formData.get("text") as string | null)?.trim() ?? "";
  const industry = (formData.get("industry") as string | null) ?? "General";
  const tone = (formData.get("tone") as string | null) ?? "Professional";
  const count = parseInt(formData.get("count") as string) || 1;
  const length = parseInt(formData.get("length") as string) || 5;

  if (!text) return "Please provide a business description.";

  try {
    const names = await generateName(text, { industry, tone, length, count });
    return names;
  } catch (error) {
    console.error(error);
    return "An error occurred. Please try again.";
  }
}
