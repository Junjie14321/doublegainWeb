'use client'

import { useState } from 'react'
import { SITE, WHATSAPP_BASE } from '@/lib/constants/site'

function buildWhatsAppLink(message: string) {
  return `${WHATSAPP_BASE}${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`
}

const whatsappIconUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2816%29-0mAmlacFMUy5i9YmrEj5pgq7qRU3bC.png'

export function LPNoodleForm({ chinese, quoteText }: { chinese: boolean; quoteText: string }) {
  const [selected, setSelected] = useState<string[]>([])

  const products = chinese
    ? ['大碌面', '香老抽', '峇拉煎辣椒酱（蘸酱）']
    : ['KL Tai Lok Mee', 'Fragrant Dark Soya Sauce', 'Belacan Chilli (Dipping)']

  function toggle(product: string) {
    setSelected(prev => prev.includes(product) ? prev.filter(p => p !== product) : [...prev, product])
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const productList = selected.length > 0 ? selected.join(', ') : (chinese ? '所选产品' : 'your products')
    const msg = chinese
      ? `你好，我对 ${productList} 很感兴趣，想用于我的业务。能否请你提供下价格和样品相关信息？`
      : `Hi, I'm interested in ${productList} for my business. Could you share pricing & sample info?`
    window.open(buildWhatsAppLink(msg), '_blank')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end">
      <label className="flex-1 font-body text-sm font-bold">
        {chinese ? '您的姓名' : 'Name'}
        <input
          placeholder={chinese ? '您的姓名' : 'Your name'}
          className="mt-2 w-full rounded-lg border-0 bg-background px-4 py-3 font-body text-dark outline-none ring-2 ring-transparent focus:ring-primary"
        />
      </label>
      <fieldset className="flex-1 space-y-2 font-body text-sm">
        <legend className="font-bold">{chinese ? '产品' : 'Products'}</legend>
        {products.map((product) => (
          <label key={product} className="flex items-center gap-2 font-bold">
            <input
              type="checkbox"
              checked={selected.includes(product)}
              onChange={() => toggle(product)}
              className="h-4 w-4 accent-primary"
            />
            {product}
          </label>
        ))}
      </fieldset>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-lg bg-background px-6 py-4 text-sm font-body font-bold uppercase text-dark transition-colors hover:bg-primary hover:text-white"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={whatsappIconUrl} alt="" aria-hidden="true" className="mr-2 h-4 w-4 object-contain" />
        {quoteText}
      </button>
    </form>
  )
}
