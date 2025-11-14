"use client";

import { useSupabase } from '@/hooks/useSupabase';
import { LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export function NavbarDashboardLink() {
  const { session } = useSupabase();

  // Só mostra o link se o usuário estiver autenticado
  if (!session) return null;

  return (
    <Link 
      href="/dashboard" 
      className="text-gray-700 hover:text-ong-primary py-2 transition-colors flex items-center gap-2"
      aria-label="Ir para o painel administrativo"
    >
      <LayoutDashboard className='h-5 w-5' aria-hidden="true" />
      <span>Dashboard</span>
    </Link>
  );
}

