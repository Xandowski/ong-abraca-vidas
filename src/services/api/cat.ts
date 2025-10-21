import { CatImage } from "@/types/cat";

export async function fetchCatImage(): Promise<CatImage[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/cat`);
    if (!response.ok) {
      throw new Error("Failed to fetch cat image");
    }
    const data: CatImage[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cat image:", error);
    throw error;
  }
}