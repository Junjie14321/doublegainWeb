'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

type ChefProduct = { name: string; image: string; href?: string }

export function ChefsCarousel({ products }: { products: ChefProduct[] }) {
  const [index, setIndex] = useState(0)
  const startX = useRef<number | null>(null)
  const next = useCallback(() => setIndex((current) => (current + 1) % products.length), [products.length])
  const previous = useCallback(() => setIndex((current) => (current - 1 + products.length) % products.length), [products.length])

  useEffect(() => {
    const timer = window.setInterval(next, 5000)
    return () => window.clearInterval(timer)
  }, [next])

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      onTouchStart={(event) => { startX.current = event.touches[0]?.clientX ?? null }}
      onTouchEnd={(event) => {
        if (startX.current === null) return
        const delta = (event.changedTouches[0]?.clientX ?? 0) - startX.current
        if (delta > 40) previous()
        if (delta < -40) next()
        startX.current = null
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Chef product carousel"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') previous()
        if (event.key === 'ArrowRight') next()
      }}
    >
      <div className="flex transition-transform duration-500 motion-reduce:transition-none" style={{ transform: `translateX(-${index * 100}%)` }}>
        {products.map((product) => (
          <article key={product.name} className="min-w-full rounded-2xl bg-white/60 p-3 shadow-sm">
            {product.href
              ? <Link href={product.href} className="block" aria-label={`View ${product.name}`}><div className="relative aspect-square"><Image src={product.image} alt={product.name} fill className="object-contain" sizes="(min-width: 1024px) 25vw, 100vw" /></div></Link>
              : <div className="relative aspect-square"><Image src={product.image} alt={product.name} fill className="object-contain" sizes="(min-width: 1024px) 25vw, 100vw" /></div>
            }
            <h3 className="relative z-10 -mt-8 text-center font-heading text-sm font-bold italic normal-case md:mt-2">{product.name}</h3>
          </article>
        ))}
      </div>
      <button type="button" onClick={previous} aria-label="Previous product" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/90 px-3 py-2 text-primary shadow-md">‹</button>
      <button type="button" onClick={next} aria-label="Next product" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/90 px-3 py-2 text-primary shadow-md">›</button>
    </div>
  )
}
