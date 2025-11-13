import Link from "next/link";
import PixSupport from '@/components/PixSupport';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { fetchCatImage } from '@/services/api/cat';

export default async function Hero() {
    let catUrl;
    try {
      const cats = await fetchCatImage();
      catUrl = cats?.[0]?.url;
    } catch (error) {
      console.error("Erro ao buscar imagem do gato:", error);
      catUrl = '/placeholder.svg';
    }

    return (
        <section 
          aria-labelledby="hero-title"
          className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br"
          style={{ backgroundImage: catUrl ? `url(${catUrl})` : "none", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
          <div className="flex flex-col items-center px-4 py-16 text-white relative z-10">
            <h1 id="hero-title" className="text-4xl md:text-5xl font-bold mb-6 w-fit">
              Encontre seu novo melhor amigo
            </h1>
          
            <p className="text-lg md:text-xl w-fit">
              Conectamos animais que precisam de um lar com pessoas que têm amor para dar.        
            </p>
            <p className="text-lg md:text-xl mb-8 w-fit">Adote, não compre.</p>
            
            <nav aria-label="Ações principais" className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/animais">
                <Button size="lg" className="bg-white font-bold text-ong-primary hover:bg-gray-100">
                  Adotar
                </Button>
              </Link>
              <PixSupport />
            </nav>
            
            <form 
              role="search" 
              className="mt-10 max-w-xl mx-auto bg-white rounded-full p-1 flex items-center shadow-lg"
              aria-label="Buscar animais para adoção"
            >
              <label htmlFor="hero-search" className="sr-only">
                Buscar animais por tipo, porte ou características
              </label>
              <input
                id="hero-search"
                name="search"
                type="search"
                placeholder="Buscar animais por tipo, porte..."
                className="rounded-full py-3 pl-6 pr-3 w-full focus:outline-none text-black"
              />
              <Button 
                type="submit"
                size="icon" 
                className="rounded-full bg-ong-primary h-11 w-11"
                aria-label="Buscar"
              >
                <Search className="h-5 w-5" aria-hidden="true" />
              </Button>
            </form>
          </div>
        </section>
    )
}