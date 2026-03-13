import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import ScrollProgress from '@/components/ScrollProgress'
import CustomCursor from '@/components/CustomCursor'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Motus Pocus — Motion Design SaaS B2B',
  description:
    'Je crée des vidéos qui révèlent la valeur de votre SaaS en 90 secondes. Motion design B2B : vidéos de conversion, onboarding et publicité.',
  metadataBase: new URL('https://motuspocus.fr'),
  openGraph: {
    title: 'Motus Pocus — Motion Design SaaS B2B',
    description: 'Je crée des vidéos qui révèlent la valeur de votre SaaS en 90 secondes.',
    url: 'https://motuspocus.fr',
    siteName: 'Motus Pocus',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} antialiased`}>
        <ScrollProgress />
        <CustomCursor />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
