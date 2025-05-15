import { SupabaseProvider } from '@/components/SupabaseProvider';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { ClientProviders } from '../components/ClientProviders';
import '../global.css';

export const metadata: Metadata = {
  title: 'Abraca Vidas',
  description: 'A Progressive Web App built with Next.js',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico',
  },
  applicationName: 'Abraca Vidas'
}


export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookiesStore = cookies();
  const supabase = createServerComponentClient({ cookies: async () => await cookiesStore });
  const { data: { session } } = await supabase.auth.getSession();
    
  return (
    <html lang="pt-BR">
      <head>
        <meta name="apple-mobile-web-app-title" content="Abraca Vidas" />
        <link rel="icon" href="/icon.ico" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="viewport" 
              content="width=device-width, initial-scale=1, viewport-fit=cover" 
      />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        <SupabaseProvider initialSession={session}>
          <ClientProviders>{children}</ClientProviders>
        </SupabaseProvider>
      </body>
    </html>
  )
}
