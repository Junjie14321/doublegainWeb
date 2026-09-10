declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

export function trackWhatsAppClick(source: string, productName?: string) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', 'whatsapp_click', {
    event_category: 'engagement',
    source,
    ...(productName && { product_name: productName }),
  })
}
