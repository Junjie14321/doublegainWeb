import type { Metadata } from 'next'
import { LandingPageTemplate } from '../english-braises/page'

export const metadata: Metadata = {
  title: 'KL Hokkien Noodle | Master 2 Foods',
  description: 'Tai Lok Mee — specialty KL Hokkien noodles for professional kitchens.',
}

export default function EnglishNoodlePage() {
  return <LandingPageTemplate variant="english-noodle" />
}
