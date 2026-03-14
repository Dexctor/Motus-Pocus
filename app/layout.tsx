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
  alternates: {
    canonical: 'https://motuspocus.fr',
  },
  openGraph: {
    title: 'Montage Vidéo SaaS B2B — Motus Pocus | Vidéos qui convertissent',
    description: 'Montage vidéo et motion design pour SaaS B2B. Vidéos de conversion, onboarding et ads qui font comprendre votre produit en 90 secondes.',
    url: 'https://motuspocus.fr',
    siteName: 'Motus Pocus',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Montage Vidéo SaaS B2B — Motus Pocus',
    description: 'Vidéos de conversion, onboarding et ads pour SaaS B2B. Devis en 24h.',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  other: {
    'theme-color': '#0a0a0a',
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
        '@type': 'WebSite',
        '@id': 'https://motuspocus.fr/#website',
        url: 'https://motuspocus.fr',
        name: 'Motus Pocus',
        description: 'Montage vidéo et motion design pour SaaS B2B.',
        inLanguage: 'fr-FR',
      },
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
      {
        '@type': 'FAQPage',
        '@id': 'https://motuspocus.fr/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Combien coûte une vidéo SaaS ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les forfaits commencent à 1 500 € HT (Boost — vidéo de conversion 60-90 sec). Le pack Scale à 2 800 € inclut conversion + onboarding. Le pack Growth à 4 500 € couvre conversion + onboarding + ads.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quel est le délai de livraison ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le processus se déroule en 4 étapes : brief (2-3 jours), storyboard (3-4 jours), production (5-7 jours), et livraison avec 2 tours de retours inclus.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quels types de vidéos sont proposés ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vidéos de conversion (landing page, hero), vidéos d\'onboarding produit, et publicités (ads) pour SaaS B2B. Montage vidéo et motion design sur mesure.',
            },
          },
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
