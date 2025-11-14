"use client";

import { useSupabase } from '@/hooks/useSupabase';
import { LogOut } from 'lucide-react';

export function NavbarSairButton() {
  const { supabase, session } = useSupabase();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Erro ao fazer logout:', error.message);
        return;
      }
      
      window.location.href = "/";
    } catch (error) {
      console.error('Erro inesperado ao fazer logout:', error);
    }
  };

  if (!session) return null;

  return (
    <button
      onClick={handleLogout}
      className="text-gray-700 hover:text-red-500 py-2 transition-colors flex items-center gap-2"
      aria-label="Sair da conta"
    >
      <LogOut className='h-5 w-5' aria-hidden="true" />
      <span>Sair</span>
    </button>
  );
}

