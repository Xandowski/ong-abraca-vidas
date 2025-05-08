"use client"
import AnimalCard, { AnimalProps } from '@/components/AnimalCard';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PixSupport from '@/components/PixSupport';
import { Button } from '@/components/ui/button';
import { useSession } from '@supabase/auth-helpers-react';
import { Heart, PawPrint, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface NavigatorStandalone extends Navigator {
  standalone?: boolean;
}

// Dados mockados para exemplo
const featuredAnimals: AnimalProps[] = [
  {
    id: 1,
    name: 'Luna',
    type: 'cat',
    breed: 'SRD',
    age: '1 ano',
    gender: 'female',
    size: 'small',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    isAdopted: false,
    description: 'Luna é uma gatinha muito carinhosa que adora brincar e se aconchegar no colo. Ela está procurando uma família que dê muito amor e atenção.'
  },
  {
    id: 2,
    name: 'Max',
    type: 'dog',
    breed: 'Labrador',
    age: '3 anos',
    gender: 'male',
    size: 'large',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    isAdopted: false,
    description: 'Max é um labrador super amigável e brincalhão. Ele é ótimo com crianças e outros animais.'
  },
  {
    id: 3,
    name: 'Bella',
    type: 'dog',
    breed: 'SRD',
    age: '2 anos',
    gender: 'female',
    size: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    isAdopted: true,
    description: 'Bella é uma cachorrinha muito dócil e carinhosa. Ela já encontrou o seu lar para sempre.'
  },
  {
    id: 4,
    name: 'Oliver',
    type: 'cat',
    breed: 'SRD',
    age: '6 meses',
    gender: 'male',
    size: 'small',
    imageUrl: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    isAdopted: false,
    description: 'Oliver é um gatinho muito brincalhão e curioso. Ele está em busca de uma família que dê muito amor e carinho.'
  },
];

const Index = () => {
  const session = useSession();
  const router = useRouter();
  const [checking, setChecking] = useState(true);
    
  useEffect(() => {
    const checkStandalone = async () => {
      const nav = navigator as NavigatorStandalone;
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || nav.standalone;
      
      if (isStandalone && !session) {
        router.push('/login');
      } else {
        setChecking(false);
      }
    };

    checkStandalone();
  }, [router, session]);

  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-blue-500" />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">

        <section className="bg-orange-400 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Encontre seu novo melhor amigo
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90">
              Conectamos animais que precisam de um lar com pessoas que têm amor para dar. 
              Adote, não compre!
            </p>
            
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredAnimals.map((animal) => (
                <AnimalCard key={animal.id} {...animal} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-ong-dark">
              Como Funciona
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-ong-gray rounded-full p-5 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-ong-teal" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Encontre</h3>
                <p className="text-gray-600">
                  Navegue pelos animais disponíveis ou use nossa ferramenta de busca para encontrar seu companheiro perfeito.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-ong-gray rounded-full p-5 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-ong-teal" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Conecte-se</h3>
                <p className="text-gray-600">
                  Entre em contato com a ONG responsável e agende uma visita para conhecer o animal pessoalmente.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-ong-gray rounded-full p-5 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <PawPrint className="h-8 w-8 text-ong-teal" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Adote</h3>
                <p className="text-gray-600">
                  Complete o processo de adoção e leve seu novo membro da família para casa.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-ong-light">
          <div className="container mx-auto px-4 flex flex-col items-center">
            <h2 id="about" className="text-2xl md:text-3xl font-bold text-center mb-12 text-ong-dark">
              Sobre a ONG
            </h2>
            <p className="text-gray-600">
              Texto sobre a ONG
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
