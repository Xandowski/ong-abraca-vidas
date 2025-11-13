
import Link from 'next/link';
import { CiHeart } from "react-icons/ci";
import { SiFacebook, SiInstagram, SiMailboxdotorg, SiWhatsapp } from 'react-icons/si';
import { Lock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-ong-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-heading text-xl mb-4">Abraça Vidas</h3>
            <p className="text-gray-300 mb-4">
              Venha conosco ser a mudança!
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/ongabracavidas/" target="_blank" className="text-gray-300 hover:text-ong-primary transition-colors">
                <SiInstagram className="h-4 w-4" />
              </a>
              <a href="https://www.facebook.com/ongabracavidas" target="_blank" className="text-gray-300 hover:text-ong-primary transition-colors">
                <SiFacebook className="h-4 w-4" />
              </a>
              <a href="https://wa.me/5516988002918" target="_blank" className="text-gray-300 hover:text-ong-primary transition-colors">
                <SiWhatsapp className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading text-xl mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/animais" className="text-gray-300 hover:text-ong-primary transition-colors">
                  Animais para Adoção
                </Link>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-ong-primary transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-ong-primary transition-colors">
                  Entre em Contato
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading text-xl mb-4">Contato</h3>
            <address className="text-gray-300 not-italic">
              <p className="mb-2">Araraquara, SP - Brasil</p>
              <p className="flex items-center gap-2 mb-2">
                <SiMailboxdotorg className="h-4 w-4" />
                <a href="mailto:contato@Abraça Vidas.org" className="hover:text-ong-primary transition-colors">
                  contato@abracavidas.org
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 mt-6 text-center text-gray-400 text-sm">
          <p className="flex items-center justify-center gap-1">
            Feito com {<CiHeart className='h-5 w-5 text-ong-orange'/>} por Abraça Vidas &copy; {new Date().getFullYear()}
          </p>
          <Link 
            href="/login" 
            className="inline-flex items-center gap-1 mt-3 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            <Lock className="h-3 w-3" />
            <span>Admin</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
