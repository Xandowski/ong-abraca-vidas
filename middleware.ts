import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const getAll = () => {
    const cookies = req.cookies;
    return Object.entries(cookies).map(([name, value]) => ({ name, value }));
  };
  const setAll = (cookies: any[]) => {
    cookies.forEach(({ name, value, options }) => {
      res.cookies.set({ name, value, ...options });
    });
  };

  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: { getAll, setAll },
    }
  );

  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|.*\\..*|api).*)',
  ],
};
