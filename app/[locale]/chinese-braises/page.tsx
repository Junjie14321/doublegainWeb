import type { Metadata } from 'next'
import { LandingPageTemplate } from '../landing-pages/english-braises/page'

export const metadata: Metadata = {
  title: '特浓香老抽 | Master 2 Foods',
  description: '专为商业厨房设计的特浓香老抽，让焖炖菜肴更诱人。',
}

export default function ChineseBraisesShortPage() {
  return <LandingPageTemplate variant="chinese" />
}
