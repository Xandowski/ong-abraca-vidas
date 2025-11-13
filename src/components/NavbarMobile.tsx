"use client";

import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NavbarAuth } from './NavbarAuth';
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
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 py-2 border-t animate-fade-in">
          <div className="flex flex-col gap-3 pb-3">
            <Link 
              href="/animais" 
              className="text-gray-700 hover:text-ong-primary py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Adotar
            </Link>
            <a 
              href="/#about" 
              className="text-gray-700 hover:text-ong-primary py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </a>
            <a 
              href="/#contact" 
              className="text-gray-700 hover:text-ong-primary py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </a>
            <NavbarAuth />
            <div className="flex flex-col gap-2 pt-2">
              {!isHomePage && (
                <PixSupport />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}