"use client";

import { Button } from '@/components/ui/button';
import { useSupabase } from '@/hooks/useSupabase';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function NavbarAuth() {
  const { supabase, session } = useSupabase();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (!session) return null;

  return (
    <Button 
      variant="ghost" 
      size="lg" 
      className="w-14 hover:bg-transparent hover:text-red-500"
      onClick={handleLogout}
    >
      <LogOut className='hover:cursor-pointer'/> Sair
    </Button>
  );
}