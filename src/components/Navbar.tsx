

import { Button } from '@/components/ui/button';
import { Menu, PlusCircle, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import PixSupport from './PixSupport';

const isOngAdmin = false;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={40} height={40}/>
          <span className="text-xl font-heading font-bold text-ong-dark">Abraça Vidas</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link href="/animais" className="text-gray-700 hover:text-ong-teal transition-colors">
            Adotar
          </Link>
          <a href="/#about" className="text-gray-700 hover:text-ong-teal transition-colors">
            Sobre
          </a>
          <a href="/#contact" className="text-gray-700 hover:text-ong-teal transition-colors">
            Contato
          </a>
          {!isHomePage && (
            <PixSupport />
          )}
          <div className="flex gap-2">

            {isOngAdmin && !isHomePage && (
              <Button 
                size="sm" 
                className="bg-ong-orange hover:bg-orange-500 flex items-center gap-1"
                asChild
              >
                <Link href="/ong/dashboard">
                  <PlusCircle className="h-4 w-4" />
                  Cadastrar Animal
                </Link>
              </Button>
            )}

          </div>
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden text-gray-700"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 py-2 border-t animate-fade-in">
          <div className="flex flex-col gap-3 pb-3">
            <Link 
              href="/animais" 
              className="text-gray-700 hover:text-ong-teal py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Adotar
            </Link>
            <a 
              href="/#about" 
              className="text-gray-700 hover:text-ong-teal py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </a>
            <a 
              href="/#contact" 
              className="text-gray-700 hover:text-ong-teal py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </a>
            
            <div className="flex flex-col gap-2 pt-2">

              {isOngAdmin && !isHomePage && (
                <Button 
                  size="sm" 
                  className="bg-ong-orange hover:bg-orange-500 flex items-center justify-center gap-1"
                  asChild
                >
                  <Link href="/ong/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <PlusCircle className="h-4 w-4" />
                    Cadastrar Animal
                  </Link>
                </Button>
              )}
              
              {/* <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center justify-center gap-1"
                asChild
              >
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <LogIn className="h-4 w-4" />
                  Entrar
                </Link>
              </Button> */}
              
              {!isHomePage && (
                <PixSupport />
              )}

            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
