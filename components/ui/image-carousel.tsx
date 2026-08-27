'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

type Slide = { src: string; alt: string }

type ImageCarouselProps = {
  slides: Slide[]
  className?: string
  interval?: number
  imageClassName?: string
  imageStyle?: React.CSSProperties
  priority?: boolean
  quality?: number
}

export function ImageCarousel({ slides, className = '', interval = 6000, imageClassName = '', imageStyle, priority = false, quality = 80 }: ImageCarouselProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const startX = useRef<number | null>(null)

  const next = useCallback(() => setIndex((current) => (current + 1) % slides.length), [slides.length])
  const previous = useCallback(() => setIndex((current) => (current - 1 + slides.length) % slides.length), [slides.length])

  useEffect(() => {
    if (paused || slides.length < 2) return
    const timer = window.setInterval(next, interval)
    return () => window.clearInterval(timer)
  }, [interval, next, paused, slides.length])

  if (!slides.length) return null

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') previous()
        if (event.key === 'ArrowRight') next()
      }}
      onTouchStart={(event) => { startX.current = event.touches[0]?.clientX ?? null }}
      onTouchEnd={(event) => {
        if (startX.current === null) return
        const delta = event.changedTouches[0]?.clientX - startX.current
        if (delta > 40) previous()
        if (delta < -40) next()
        startX.current = null
      }}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
    >
      <div className="flex h-full transition-transform duration-700 motion-reduce:transition-none" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((slide, slideIndex) => (
          <div className="relative h-full min-w-full" key={slide.src} aria-hidden={slides[index].src !== slide.src}>
            <Image src={slide.src} alt={slide.alt} fill className={`object-cover ${imageClassName}`} sizes="100vw" priority={priority && slideIndex === 0} loading={priority && slideIndex === 0 ? 'eager' : 'lazy'} quality={quality} style={imageStyle} />
          </div>
        ))}
      </div>
      {slides.length > 1 && (
        <>
          <button type="button" onClick={previous} aria-label="Previous slide" className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-primary shadow-md transition hover:scale-105">‹</button>
          <button type="button" onClick={next} aria-label="Next slide" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-primary shadow-md transition hover:scale-105">›</button>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2" role="tablist" aria-label="Slides">
            {slides.map((slide, slideIndex) => (
              <button key={slide.src} type="button" role="tab" aria-selected={index === slideIndex} aria-label={`Go to slide ${slideIndex + 1}`} onClick={() => setIndex(slideIndex)} className={`h-2 w-2 rounded-full transition ${index === slideIndex ? 'bg-secondary' : 'bg-white/70'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
