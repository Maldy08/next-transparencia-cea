import './globals.css'
import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import { AuthProvider } from './auth/components/AuthProvider'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], weight: ['500', '600', '700', '800'], variable: '--font-outfit' })

export const metadata: Metadata = {
  title: 'CEABC — Repositorio de Transparencia',
  description: 'Sistema de repositorio de documentos de transparencia — Comisión Estatal del Agua de Baja California',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#651930' },
    { media: '(prefers-color-scheme: dark)', color: '#1c1917' },
  ],
}

export default function RootLayout({children}: { children: React.ReactNode}) {
  return (
    <AuthProvider>
      <html lang="es" suppressHydrationWarning>
        <body className={`${inter.variable} ${outfit.variable} ${inter.className}`}>{children}</body>
      </html>
    </AuthProvider>
  )
}
