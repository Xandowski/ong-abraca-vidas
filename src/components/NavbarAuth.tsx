"use client";

import { useSupabase } from '@/hooks/useSupabase';
import { Lock, LogOut } from 'lucide-react';
import Link from 'next/link';

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
    <div className="flex items-center gap-1">
      {/* Link Alterar Senha */}
      <Link 
        href="/dashboard/alterar-senha" 
        className="text-gray-700 hover:text-ong-primary py-2 transition-colors flex items-center gap-2"
        aria-label="Alterar senha"
      >
        <Lock className='h-5 w-5' aria-hidden="true" />
        <span>Senha</span>
      </Link>

      {/* Botão Logout */}
      <button
        onClick={handleLogout}
        className="text-gray-700 hover:text-red-500 py-2 transition-colors flex items-center gap-2"
        aria-label="Sair da conta"
      >
        <LogOut className='h-5 w-5' aria-hidden="true" />
        <span>Sair</span>
      </button>
    </div>
  );
}