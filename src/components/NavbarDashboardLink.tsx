"use client";

import { Button } from '@/components/ui/button';
import { useSupabase } from '@/hooks/useSupabase';
import { LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export function NavbarDashboardLink() {
  const { session } = useSupabase();

  // Só mostra o link se o usuário estiver autenticado
  if (!session) return null;

  return (
    <Link href="/dashboard" aria-label="Ir para o painel administrativo">
      <Button 
        variant="ghost" 
        size="lg" 
        className="hover:bg-transparent hover:text-ong-primary"
      >
        <LayoutDashboard className='h-5 w-5' aria-hidden="true" />
        <span className="ml-1">Dashboard</span>
      </Button>
    </Link>
  );
}

