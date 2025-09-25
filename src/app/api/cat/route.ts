import { NextResponse } from "next/server";
import { CatImage } from "@/types/cat";

let cachedData: CatImage[] | null = null;
let lastFetchTime = 0;

export async function GET() {
  const now = Date.now();
  const cacheDuration = 24 * 60 * 60 * 1000; // 24 horas

  if (cachedData && now - lastFetchTime < cacheDuration) {
    console.log("🔄 Usando cache");
    return NextResponse.json(cachedData);
  }

  try {
    console.log("📡 Buscando nova imagem do TheCatAPI...");
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const data: CatImage[] = await response.json();

    cachedData = data;
    lastFetchTime = now;

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