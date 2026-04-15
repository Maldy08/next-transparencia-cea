import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from './auth/components/AuthProvider'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'CEABC — Repositorio de Transparencia',
  description: 'Sistema de repositorio de documentos de transparencia — Comisión Estatal del Agua de Baja California',
}

export default function RootLayout({children}: { children: React.ReactNode}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </AuthProvider>
  )
}
