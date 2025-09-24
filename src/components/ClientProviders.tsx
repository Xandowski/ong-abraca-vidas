'use client'

import { Toaster as Sonner } from '@/components/ui/sonner'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import { queryClient } from '@/lib/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'

export function ClientProviders({ children }: { children: React.ReactNode }) {

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  )
}
