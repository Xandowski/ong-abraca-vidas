
import Link from 'next/link';
import { CiHeart } from "react-icons/ci";
import { SiFacebook, SiInstagram, SiMailboxdotorg, SiWhatsapp } from 'react-icons/si';
import { Lock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-ong-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <section aria-labelledby="footer-about">
            <h3 id="footer-about" className="font-heading text-xl mb-4">Abraça Vidas</h3>
            <p className="text-gray-300 mb-4">
              Venha conosco ser a mudança!
            </p>
            <nav aria-label="Redes sociais">
              <ul className="flex space-x-4 list-none">
                <li>
                  <a 
                    href="https://www.instagram.com/ongabracavidas/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-ong-primary transition-colors"
                    aria-label="Instagram da ONG Abraça Vidas"
                  >
                    <SiInstagram className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.facebook.com/ongabracavidas" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-ong-primary transition-colors"
                    aria-label="Facebook da ONG Abraça Vidas"
                  >
                    <SiFacebook className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://wa.me/5516988002918" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-ong-primary transition-colors"
                    aria-label="WhatsApp da ONG Abraça Vidas"
                  >
                    <SiWhatsapp className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </nav>
          </section>
          
          <section aria-labelledby="footer-links">
            <h3 id="footer-links" className="font-heading text-xl mb-4">Links Úteis</h3>
            <nav aria-label="Links úteis">
              <ul className="space-y-2 list-none">
                <li>
                  <Link href="/animais" className="text-gray-300 hover:text-ong-primary transition-colors">
                    Animais para Adoção
                  </Link>
                </li>
                <li>
                  <a href="/#about" className="text-gray-300 hover:text-ong-primary transition-colors">
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a href="/#contact" className="text-gray-300 hover:text-ong-primary transition-colors">
                    Entre em Contato
                  </a>
                </li>
              </ul>
            </nav>
          </section>
          
          <section aria-labelledby="footer-contact">
            <h3 id="footer-contact" className="font-heading text-xl mb-4">Contato</h3>
            <address className="text-gray-300 not-italic">
              <p className="mb-2">Araraquara, SP - Brasil</p>
              <p className="flex items-center gap-2 mb-2">
                <SiMailboxdotorg className="h-4 w-4" aria-hidden="true" />
                <a 
                  href="mailto:contato@abracavidas.org" 
                  className="hover:text-ong-primary transition-colors"
                  aria-label="Enviar email para contato@abracavidas.org"
                >
                  contato@abracavidas.org
                </a>
              </p>
            </address>
          </section>
        </div>
        
        <div className="border-t border-gray-700 pt-6 mt-6 text-center text-gray-400 text-sm">
          <p className="flex items-center justify-center gap-1">
            Feito com {<CiHeart className='h-5 w-5 text-ong-orange' aria-hidden="true" />} por Abraça Vidas &copy; {new Date().getFullYear()}
          </p>
          <Link 
            href="/login" 
            className="inline-flex items-center gap-1 mt-3 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            aria-label="Acesso administrativo"
          >
            <Lock className="h-3 w-3" aria-hidden="true" />
            <span>Admin</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
