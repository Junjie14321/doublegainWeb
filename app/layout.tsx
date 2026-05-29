import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Master 2',
    template: '%s | Master 2',
  },
  description: 'Master 2 Foods is a trusted B2B supplier that supplies sauces and ingredients to Asian kitchens in Singapore since 1996.',
  applicationName: 'Master 2',
  icons: {
    icon: '/images/LogoIcon.png',
    apple: '/images/LogoIcon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/heading-font.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/sub-heading-font.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/body-font.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
