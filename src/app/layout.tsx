import { SupabaseProvider } from '@/components/SupabaseProvider';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { ClientProviders } from '../components/ClientProviders';
import '../global.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const getAll = () => {
    const all = cookieStore.getAll();
    return all.map(({ name, value }) => ({ name, value }));
  };
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll } }
  );
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
  );
}
