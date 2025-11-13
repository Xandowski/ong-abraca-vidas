import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Heart, PawPrint, Search } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { HeroSkeleton, CardSkeleton } from '@/components/ui/skeleton';
import Hero from '@/components/Hero';
import { ContactForm } from '@/components/ContactForm';
import AnimalCardWrapper from '@/components/AnimalCardWrapper';

export const dynamic = 'force-dynamic';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Suspense fallback={<HeroSkeleton />}>
          <Hero />
        </Suspense>
        
        <section className="py-16 bg-ong-light">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-ong-dark">
                Animais em Destaque
              </h2>
              <Link href="/animais" className="text-ong-primary font-medium hover:underline">
                Ver todos →
              </Link>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <AnimalCardWrapper limit={4}/>
            </Suspense>
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

        <section 
          className="py-16 bg-white" 
          aria-labelledby="contact-heading"
        >
          <div className="container mx-auto px-4 flex flex-col items-center">
            <h2 
              id="contact-heading" 
              className="text-2xl md:text-3xl font-bold text-center mb-12 text-ong-dark"
            >
              Entre em contato
            </h2>
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
