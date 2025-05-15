
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';
import { LogOut, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import PixSupport from './PixSupport';

const isOngAdmin = false;

const Navbar = () => {
  const supabase = createClientComponentClient();
  const session = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

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

        {session && (
          <Button 
          variant="ghost" 
          size="lg" 
          className="w-14 hover:bg-transparent hover:text-red-500"
          onClick={handleLogout}
        >
          <LogOut  className='hover:cursor-pointer'/> Sair
        </Button>  
        )}
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
            {session && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-14"
                onClick={handleLogout}
              >
                <LogOut  className='hover:cursor-pointer'/> Sair
              </Button> 
            )}
            <div className="flex flex-col gap-2 pt-2">

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
