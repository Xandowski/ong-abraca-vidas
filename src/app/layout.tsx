// src/app/layout.tsx
import type { Metadata } from 'next'
import { ClientProviders } from '../components/ClientProviders'
import '../global.css'

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


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="apple-mobile-web-app-title" content="Abraca Vidas" />
        <link rel="icon" href="/icon.ico" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
