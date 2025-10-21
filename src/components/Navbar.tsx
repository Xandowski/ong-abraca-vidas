import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { NavbarAuth } from './NavbarAuth';
import { NavbarMobile } from './NavbarMobile';
import PixSupport from './PixSupport';

export default function Navbar() {
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
          
          <Suspense fallback={null}>
            <PixSupport />
          </Suspense>

          <Suspense fallback={null}>
            <NavbarAuth />
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <NavbarMobile />
        </Suspense>
      </div>
    </nav>
  );
}
