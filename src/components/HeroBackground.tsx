'use client';

import { useEffect, useState } from 'react';

const CACHE_KEY = 'hero-cat-image';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas em milissegundos

interface CachedImage {
  url: string;
  timestamp: number;
}

export function HeroBackground({ children }: { children: React.ReactNode }) {
  const [backgroundUrl, setBackgroundUrl] = useState<string>('/placeholder.svg');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBackgroundImage() {
      try {
        // Verifica se há imagem em cache no localStorage
        const cached = localStorage.getItem(CACHE_KEY);
        
        if (cached) {
          const cachedData: CachedImage = JSON.parse(cached);
          const now = Date.now();
          
          // Verifica se o cache ainda é válido (menos de 24h)
          if (now - cachedData.timestamp < CACHE_DURATION) {
            console.log('🖼️ Usando imagem em cache (válido por mais', 
              Math.round((CACHE_DURATION - (now - cachedData.timestamp)) / 1000 / 60 / 60), 'horas)');
            setBackgroundUrl(cachedData.url);
            setIsLoading(false);
            return;
          }
          
          console.log('⏰ Cache expirado (24h), buscando nova imagem...');
        }
        
        // Cache não existe ou expirou - busca nova imagem
        console.log('📡 Buscando nova imagem da Cat API...');
        const response = await fetch('/api/cat');
        
        if (!response.ok) {
          throw new Error('Failed to fetch cat image');
        }
        
        const data = await response.json();
        const newUrl = data[0]?.url || '/placeholder.svg';
        
        // Salva no cache com timestamp
        const cacheData: CachedImage = {
          url: newUrl,
          timestamp: Date.now()
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        
        console.log('✅ Nova imagem cacheada por 24h');
        setBackgroundUrl(newUrl);
        
      } catch (error) {
        console.error('❌ Erro ao buscar imagem:', error);
        setBackgroundUrl('/placeholder.svg');
      } finally {
        setIsLoading(false);
      }
    }

    loadBackgroundImage();
  }, []);

  return (
    <section 
      aria-labelledby="hero-title"
      className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br transition-all duration-500"
      style={{ 
        backgroundImage: `url(${backgroundUrl})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        opacity: isLoading ? 0.8 : 1
      }}
    >
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      {children}
    </section>
  );
}

