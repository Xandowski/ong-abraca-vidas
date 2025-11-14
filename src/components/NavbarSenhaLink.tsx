"use client";

import { useSupabase } from '@/hooks/useSupabase';
import { Lock } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function NavbarSenhaLink() {
  const { session } = useSupabase();
  const pathname = usePathname();

  if (!session) return null;

  // Só mostra o link se o usuário está no dashboard ou em sub-rotas
  const isInDashboard = pathname?.startsWith('/dashboard');
  if (!isInDashboard) return null;

  return (
    <Link 
      href="/dashboard/alterar-senha" 
      className="text-gray-700 hover:text-ong-primary py-2 transition-colors flex items-center gap-2"
      aria-label="Trocar senha"
    >
      <Lock className='h-5 w-5' aria-hidden="true" />
      <span>Trocar Senha</span>
    </Link>
  );
}

