import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import ScrollProgress from '@/components/ScrollProgress'
import CustomCursor from '@/components/CustomCursor'
import MobileCTA from '@/components/MobileCTA'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Montage Vidéo SaaS B2B — Motus Pocus | Vidéos qui convertissent',
  description:
    'Montage vidéo et motion design pour SaaS B2B. Vidéos de conversion, onboarding et ads qui font comprendre votre produit en 90 secondes. Devis en 24h.',
  metadataBase: new URL('https://motuspocus.fr'),
  openGraph: {
    title: 'Montage Vidéo SaaS B2B — Motus Pocus | Vidéos qui convertissent',
    description: 'Montage vidéo et motion design pour SaaS B2B. Vidéos de conversion, onboarding et ads qui font comprendre votre produit en 90 secondes.',
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://motuspocus.fr/#person',
        name: 'Gaël',
        jobTitle: 'Monteur vidéo & Motion Designer SaaS B2B',
        url: 'https://motuspocus.fr',
        email: 'motuspocus.lab@gmail.com',
        sameAs: ['https://linkedin.com/in/motuspocus'],
      },
      {
        '@type': 'Service',
        '@id': 'https://motuspocus.fr/#service',
        name: 'Montage Vidéo & Motion Design SaaS B2B',
        provider: { '@id': 'https://motuspocus.fr/#person' },
        serviceType: 'Production vidéo',
        areaServed: { '@type': 'Country', name: 'France' },
        description:
          'Montage vidéo et motion design pour SaaS B2B : vidéos de conversion, onboarding et publicité.',
        offers: [
          { '@type': 'Offer', name: 'Boost', priceCurrency: 'EUR', price: '1500', description: 'Vidéo de conversion 60-90 sec' },
          { '@type': 'Offer', name: 'Scale', priceCurrency: 'EUR', price: '2800', description: 'Vidéo conversion + onboarding' },
          { '@type': 'Offer', name: 'Growth', priceCurrency: 'EUR', price: '4500', description: 'Pack complet : conversion + onboarding + ads' },
        ],
      },
    ],
  }

  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ScrollProgress />
        <CustomCursor />
        <MobileCTA />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
