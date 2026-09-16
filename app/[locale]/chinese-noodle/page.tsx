import type { Metadata } from 'next'
import { LandingPageTemplate } from '../landing-pages/english-braises/page'

export const metadata: Metadata = {
  title: '吉隆坡福建面 | Master 2 Foods',
  description: '正宗吉隆坡福建面专用大碌面，专为商业厨房设计。',
}

export default function ChineseNoodleShortPage() {
  return <LandingPageTemplate variant="chinese-noodle" />
}
