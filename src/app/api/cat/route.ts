import { NextResponse } from "next/server";
import { CatImage } from "@/types/cat";
import { unstable_cache } from 'next/cache';

async function fetchCatFromAPI(): Promise<CatImage[]> {
  console.log("📡 Buscando nova imagem do TheCatAPI...");
  const response = await fetch("https://api.thecatapi.com/v1/images/search");
  if (!response.ok) {
    throw new Error("Failed to fetch from TheCatAPI");
  }
  return response.json();
}

// Função que será cacheada
const getCachedCatImage = unstable_cache(
  async () => {
    try {
      return await fetchCatFromAPI();
    } catch (error) {
      console.error("Erro ao buscar gatos:", error);
      throw error;
    }
  },
  ["cat-image"], // cache key
  {
    revalidate: 86400, // 24 horas em segundos
    tags: ["cat-image"],
  }
);

export async function GET() {
  try {
    const data = await getCachedCatImage();
    
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, max-age=86400", // 24h em segundos
      },
    });
  } catch (error) {
    console.error("Erro ao buscar gatos:", error);
    return NextResponse.json(
      { error: "Failed to fetch cat image" },
      { status: 500 }
    );
  }
}