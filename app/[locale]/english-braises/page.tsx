import type { Metadata } from 'next'
import { LandingPageTemplate } from '../landing-pages/english-braises/page'

export const metadata: Metadata = {
  title: 'English Braises | Master 2 Foods',
  description: 'Extra rich braising ingredients for chefs and food businesses.',
}

export default function EnglishBraisesShortPage() {
  return <LandingPageTemplate variant="english" />
}
