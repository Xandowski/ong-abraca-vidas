
import { Button } from '@/components/ui/button';
import { LogIn, Menu, PlusCircle, UserPlus, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../logo.svg';

// Temporary flag to simulate an admin (ONG) user
// This would normally come from an authentication context
const isOngAdmin = false;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="" className='h-10 w-10'/>
          <span className="text-xl font-heading font-bold text-ong-dark">Abraça Vidas</span>
        </Link>
        
        {/* Menu de desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/animals" className="text-gray-700 hover:text-ong-teal transition-colors">
            Adotar
          </Link>
          <a href="#about" className="text-gray-700 hover:text-ong-teal transition-colors">
            Sobre
          </a>
          <a href="#contact" className="text-gray-700 hover:text-ong-teal transition-colors">
            Contato
          </a>
          
          <div className="flex gap-2">
            {/* Show Cadastrar Animal button only for ONG admins and not on home page */}
            {isOngAdmin && !isHomePage && (
              <Button 
                size="sm" 
                className="bg-ong-orange hover:bg-orange-500 flex items-center gap-1"
                asChild
              >
                <Link to="/ong/dashboard">
                  <PlusCircle className="h-4 w-4" />
                  Cadastrar Animal
                </Link>
              </Button>
            )}

          </div>
        </div>
        
        {/* Botão do menu mobile */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden text-gray-700"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 py-2 border-t animate-fade-in">
          <div className="flex flex-col gap-3 pb-3">
            <Link 
              to="/animals" 
              className="text-gray-700 hover:text-ong-teal py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Adotar
            </Link>
            <a 
              href="#about" 
              className="text-gray-700 hover:text-ong-teal py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </a>
            <a 
              href="#contact" 
              className="text-gray-700 hover:text-ong-teal py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </a>
            
            <div className="flex flex-col gap-2 pt-2">
              {/* Show Cadastrar Animal button only for ONG admins in mobile menu and not on home page */}
              {isOngAdmin && !isHomePage && (
                <Button 
                  size="sm" 
                  className="bg-ong-orange hover:bg-orange-500 flex items-center justify-center gap-1"
                  asChild
                >
                  <Link to="/ong/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <PlusCircle className="h-4 w-4" />
                    Cadastrar Animal
                  </Link>
                </Button>
              )}
              
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center justify-center gap-1"
                asChild
              >
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <LogIn className="h-4 w-4" />
                  Entrar
                </Link>
              </Button>
              
              {/* Show Cadastrar button only if not on home page */}
              {!isHomePage && (
                <Button 
                  size="sm" 
                  className="bg-ong-teal hover:bg-teal-600 flex items-center justify-center gap-1"
                  asChild
                >
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <UserPlus className="h-4 w-4" />
                    Cadastrar
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
