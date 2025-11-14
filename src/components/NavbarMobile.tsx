"use client";

import { Menu, X } from 'lucide-react';
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
      
      {isMenuOpen && (
        <nav 
          id="mobile-menu"
          className="md:hidden bg-white px-4 py-2 border-t animate-fade-in"
          aria-label="Navegação principal mobile"
        >
          <ul className="flex flex-col gap-3 pb-3 list-none">
            <li>
              <Link 
                href="/animais" 
                className="text-gray-700 hover:text-ong-primary py-2 transition-colors block"
                onClick={() => setIsMenuOpen(false)}
              >
                Adotar
              </Link>
            </li>
            <li>
              <a 
                href="/#about" 
                className="text-gray-700 hover:text-ong-primary py-2 transition-colors block"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </a>
            </li>
            <li>
              <a 
                href="/#contact" 
                className="text-gray-700 hover:text-ong-primary py-2 transition-colors block"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </a>
            </li>
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
      )}
    </>
  );
}