'use client'

import { ImageCarousel } from '@/components/ui/image-carousel'

export function BrandTonalitySection() {
  return (
    <section className="py-6 md:py-10" style={{ backgroundColor: '#FFFEF8' }} aria-label="Master 2 brand tonality">
      <div className="container-pad">
        <div className="overflow-hidden rounded-2xl shadow-sm" style={{ aspectRatio: '1500 / 550', backgroundColor: '#451919' }}>
          <ImageCarousel
            slides={[
              { src: '/images/master2food-brand-tonality-1.png', alt: 'Master 2 Foods brand tonality — specialty sauces and ingredients' },
              { src: '/images/master2food-brand-tonality-2.png', alt: 'Master 2 Foods brand tonality — noodles and sauces' },
            ]}
            className="h-full w-full"
            interval={7000}
            imageStyle={{ backgroundColor: '#FFFEF8' }}
          />
        </div>
      </div>
    </section>
  )
}
