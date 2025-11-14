"use client";

import { useSupabase } from '@/hooks/useSupabase';
import { LayoutDashboard } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function NavbarDashboardLink() {
  const { session } = useSupabase();
  const pathname = usePathname();

  // Só mostra o link se o usuário estiver autenticado
  if (!session) return null;

  // Oculta o link se o usuário já está no dashboard ou em sub-rotas
  const isInDashboard = pathname?.startsWith('/dashboard');
  if (isInDashboard) return null;

  return (
    <Link 
      href="/dashboard" 
      className="text-gray-700 hover:text-ong-primary py-2 transition-colors flex items-center gap-2"
      aria-label="Ir para a área administrativa"
    >
      <LayoutDashboard className='h-5 w-5' aria-hidden="true" />
      <span>Área Admin</span>
    </Link>
  );
}

