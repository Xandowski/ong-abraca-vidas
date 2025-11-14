"use client";

import { Menu, X, PawPrint, Info, Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NavbarAuth } from './NavbarAuth';
import { NavbarDashboardLink } from './NavbarDashboardLink';
import Link from 'next/link';
import PixSupport from './PixSupport';

export function NavbarMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)} 
        className="md:hidden text-gray-700"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        aria-label="Menu de navegação"
      >
        <span className="sr-only">
          {isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        </span>
        {isMenuOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Menu className="h-6 w-6" aria-hidden="true" />
        )}
      </button>
      
      <>
        {/* Overlay - fecha o drawer ao clicar */}
        <div 
          className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
        
        {/* Drawer lateral */}
        <nav 
          id="mobile-menu"
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          aria-label="Navegação principal mobile"
        >
            {/* Header do drawer com botão fechar */}
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-heading font-bold text-ong-dark">Menu</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-ong-primary transition-colors"
                aria-label="Fechar menu"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            
            {/* Lista de navegação */}
            <ul className="flex flex-col gap-3 p-4 list-none">
              <li>
                <Link 
                  href="/animais" 
                  className="text-gray-700 hover:text-ong-primary py-2 transition-colors flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <PawPrint className="h-5 w-5" aria-hidden="true" />
                  <span>Adotar</span>
                </Link>
              </li>
              <li>
                <a 
                  href="/#about" 
                  className="text-gray-700 hover:text-ong-primary py-2 transition-colors flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Info className="h-5 w-5" aria-hidden="true" />
                  <span>Sobre</span>
                </a>
              </li>
              <li>
                <a 
                  href="/#contact" 
                  className="text-gray-700 hover:text-ong-primary py-2 transition-colors flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Mail className="h-5 w-5" aria-hidden="true" />
                  <span>Contato</span>
                </a>
              </li>
              
              {/* Separador visual entre público e admin */}
              <li className="border-t border-gray-200 my-2" aria-hidden="true" />
              
              <li onClick={() => setIsMenuOpen(false)}>
                <NavbarDashboardLink />
              </li>
              <li>
                <NavbarAuth />
              </li>
              {!isHomePage && (
                <li className="pt-2">
                  <PixSupport />
                </li>
              )}
            </ul>
          </nav>
        </>
    </>
  );
}