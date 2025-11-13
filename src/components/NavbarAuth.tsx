"use client";

import { Button } from '@/components/ui/button';
import { useSupabase } from '@/hooks/useSupabase';
import { LogOut } from 'lucide-react';

export function NavbarAuth() {
  const { supabase, session } = useSupabase();

  const handleLogout = async () => {
    try {
      // Encerra a sessão do usuário no Supabase (scope global = todas as sessões)
      // Referência: https://supabase.com/docs/guides/auth/signout
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Erro ao fazer logout:', error.message);
        return; // Não redireciona se houver erro
      }
      
      // Hard redirect (recarrega página inteira) para garantir:
      // - Limpeza completa do cache do Next.js
      // - Invalidação de tokens antigos em memória
      // - Revalidação do middleware de autenticação
      window.location.href = "/";
    } catch (error) {
      // Captura erros inesperados (ex: falha de rede)
      console.error('Erro inesperado ao fazer logout:', error);
    }
  };

  if (!session) return null;

  return (
    <Button 
      variant="ghost" 
      size="lg" 
      className="w-14 hover:bg-transparent hover:text-red-500"
      onClick={handleLogout}
      aria-label="Sair da conta"
    >
      <LogOut className='hover:cursor-pointer' aria-hidden="true" /> Sair
    </Button>
  );
}