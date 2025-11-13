import { NextResponse } from "next/server";
import { CatImage } from "@/types/cat";

// Busca diretamente da Cat API sem cache no servidor
// O cache será gerenciado client-side (localStorage) por dispositivo
async function fetchCatFromAPI(): Promise<CatImage[]> {
  console.log("📡 Buscando nova imagem do TheCatAPI...");
  const response = await fetch("https://api.thecatapi.com/v1/images/search", {
    cache: 'no-store' // Garante que não haverá cache do Next.js
  });
  if (!response.ok) {
    throw new Error("Failed to fetch from TheCatAPI");
  }
  return response.json();
}

export async function GET() {
  try {
    const data = await fetchCatFromAPI();
    
    return NextResponse.json(data, {
      headers: {
        // Sem cache no servidor - cada requisição busca nova imagem
        // O cliente (navegador) é quem decide cachear ou não via localStorage
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
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