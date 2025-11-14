import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { NavbarAuth } from './NavbarAuth';
import { NavbarDashboardLink } from './NavbarDashboardLink';
import { NavbarMobile } from './NavbarMobile';
import PixSupport from './PixSupport';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50" aria-label="Navegação principal">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2" aria-label="Ir para página inicial">
          <Image src="/logo.png" alt="ONG Abraça Vidas - Logo" width={40} height={40} className="rounded-md"/>
          <span className="text-xl font-heading font-bold text-ong-dark" aria-hidden="true">Abraça Vidas</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          {/* Navegação pública */}
          <div className="flex items-center gap-4">
            <Link href="/animais" className="text-gray-700 hover:text-ong-primary transition-colors">
              Adotar
            </Link>
            <a href="/#about" className="text-gray-700 hover:text-ong-primary transition-colors">
              Sobre
            </a>
            <a href="/#contact" className="text-gray-700 hover:text-ong-primary transition-colors">
              Contato
            </a>
          </div>
          
          {/* CTA Apoiar (público) */}
          <Suspense fallback={null}>
            <PixSupport />
          </Suspense>
          
          {/* Área administrativa (condicional) */}
          <div className="flex items-center gap-3">
            <Suspense fallback={null}>
              <NavbarDashboardLink />
            </Suspense>

            <Suspense fallback={null}>
              <NavbarAuth />
            </Suspense>
          </div>
        </div>

        <Suspense fallback={null}>
          <NavbarMobile />
        </Suspense>
      </div>
    </nav>
  );
}
