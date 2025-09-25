"use client"

import AnimalCard from '@/components/AnimalCard';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PixSupport from '@/components/PixSupport';
import { Button } from '@/components/ui/button';
import { useSupabase } from '@/components/useSupabase';
import { useToast } from '@/hooks/use-toast';
import { Animal } from '@/types/database';
import { Heart, PawPrint, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchCatImage } from '@/services/api/cat';
import { CatImage } from '@/types/cat';

interface NavigatorStandalone extends Navigator {
  standalone?: boolean;
}

const Index = () => {
  const { supabase, session } = useSupabase();
  const router = useRouter();
  const { toast } = useToast();
  const [checking, setChecking] = useState(true);
  const [featuredAnimals, setFeaturedAnimals] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cat, setCat] = useState<CatImage | null>(null);

  useEffect(() => {
    fetchCatImage()
        .then((cats) => {
          if (cats.length > 0) {
            setCat(cats[0]);
            console.log("Cat URL:", cats[0].url);
          }
        })
        .catch(console.error);
  }, []);

  useEffect(() => {
    const checkStandalone = async () => {
      const nav = navigator as NavigatorStandalone;
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || nav.standalone;
      
      if (isStandalone) {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          router.push('/dashboard');
        } else {
          router.push('/login');
        }
      }
      setChecking(false);
    };

    checkStandalone();
  }, [router, supabase]);

  useEffect(() => {
    const fetchFeaturedAnimals = async () => {
      try {
        const { data, error } = await supabase
          .from('animals')
          .select('*')
          .eq('isAdopted', false)
          .order('created_at', { ascending: false })
          .limit(4);
        console.log('Featured Animals:', data);
        if (error) {
          throw error;
        }

        setFeaturedAnimals(data || []);
      } catch (error) {
        console.error('Error fetching featured animals:', error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar animais",
          description: "Não foi possível carregar os animais em destaque. Tente novamente mais tarde.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedAnimals();
  }, [supabase, toast]);

  if (checking) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br "
        style={{ backgroundImage: cat ? `url(${cat.url})` : "none", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="flex flex-col items-center px-4 py-16 text-white relative z-10 ">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 w-fit ">
              Encontre seu novo melhor amigo
            </h1>
          
              <p className="text-lg md:text-xl w-fit ">
                Conectamos animais que precisam de um lar com pessoas que têm amor para dar.        
              </p>
              <p className="text-lg md:text-xl mb-8 w-fit">Adote, não compre.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/animais">
                <Button size="lg" className="bg-white font-bold text-ong-teal hover:bg-gray-100">
                  Adotar
                </Button>
              </Link>
              <PixSupport />
            </div>
            
            <div className="mt-10 max-w-xl mx-auto bg-white rounded-full p-1 flex items-center shadow-lg">
              <input
                type="text"
                placeholder="Buscar animais por tipo, porte..."
                className="rounded-full py-3 pl-6 pr-3 w-full focus:outline-none text-black"
              />
              <Button size="icon" className="rounded-full bg-ong-teal h-11 w-11">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-ong-light">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-ong-dark">
                Animais em Destaque
              </h2>
              <Link href="/animais" className="text-ong-teal font-medium hover:underline">
                Ver todos →
              </Link>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-lg" />
                    <div className="p-4">
                      <div className="h-6 bg-gray-200 rounded w-2/3 mb-2" />
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredAnimals.map((animal) => (
                  <AnimalCard 
                    key={animal.id} 
                    {...animal} 
                    imageUrl={animal.imageUrl}
                    isAdopted={animal.isAdopted}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-ong-dark">
              Como Funciona
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Search className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Encontre um animal</h3>
                <p className="text-gray-600">
                  Navegue pelos animais disponíveis para adoção e encontre aquele que mais combina com você
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Entre em contato</h3>
                <p className="text-gray-600">
                  Preencha o formulário de interesse e nossa equipe entrará em contato para agendar uma visita
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <PawPrint className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Adote com responsabilidade</h3>
                <p className="text-gray-600">
                  Após a aprovação, assine o termo de adoção e leve seu novo amigo para casa
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-ong-light">
          <div className="container mx-auto flex flex-col items-center">
            <h2 id="about" className="text-2xl md:text-3xl font-bold text-center mb-12 text-ong-dark">
              Sobre a ONG
            </h2>
            <p className="lg:px-80 text-gray-600 text-lg">
              A Abraça Vidas tem como objetivo a realização de projetos de assistência social, proteção e defesa dos animais, comunicação e conscientização
               social e apoio a entidades do 3º setor com consultoria de marketing.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 flex flex-col items-center">
            <h2 id="contact" className="text-2xl md:text-3xl font-bold text-center mb-12 text-ong-dark">
              Entre em contato
            </h2>
            <form className="w-full max-w-lg">
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Assunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ong-teal focus:ring-ong-teal"
                  placeholder="Digite o assunto"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ong-teal focus:ring-ong-teal"
                  placeholder="Digite seu email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ong-teal focus:ring-ong-teal"
                  placeholder="Digite sua mensagem"
                ></textarea>
              </div>
              <Button type="submit" className="bg-ong-teal text-white hover:bg-teal-600">
                Enviar
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
