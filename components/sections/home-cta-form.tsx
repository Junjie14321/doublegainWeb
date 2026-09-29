'use client'

import { useState } from 'react'
import { SITE, WHATSAPP_BASE } from '@/lib/constants/site'

const whatsappIcon = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2816%29-0mAmlacFMUy5i9YmrEj5pgq7qRU3bC.png'

function buildWhatsAppLink(message: string) {
  return `${WHATSAPP_BASE}${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`
}

const EN_GROUPS: [string, string[]][] = [
  ['Specialty Braising Sauces', ['Fragrant Dark Soya Sauce', 'Other Sauces']],
  ['Noodle', ['Tai Lok Mee', 'Ee Mee', 'Fried Crispy Noodle']],
  ['Pre-made Ingredients', ['Yam Ring Basket', 'Frozen Prawn Roll', 'Complete Sauces', 'Pork Lard']],
  ['Ready-Made Dessert', ['Yam Paste with Ginkgo']],
]

const ZH_GROUPS: [string, string[]][] = [
  ['香老抽', ['香老抽', '其他酱汁']],
  ['常用调料', ['常用调料']],
  ['面条', ['吉隆坡福建面', '伊面', '炸生面']],
  ['预制食材', ['芋头圈', '冷冻虾卷', '成品咖喱酱料', '猪油']],
  ['即食甜品', ['白果芋泥']],
]

export function HomeCTAForm({ chinese }: { chinese: boolean }) {
  const [selected, setSelected] = useState<string[]>([])
  const groups = chinese ? ZH_GROUPS : EN_GROUPS

  function toggle(product: string) {
    setSelected(prev => prev.includes(product) ? prev.filter(p => p !== product) : [...prev, product])
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const productList = selected.join(', ')
    const msg = chinese
      ? productList
        ? `你好，我对 ${productList} 感兴趣，想用于我的业务。能否请你提供下价格和样品相关信息？`
        : '你好，我想了解 Master 2 Foods 的产品报价及样品，请问方便分享详情吗？'
      : productList
        ? `Hi, I'm interested in ${productList} for my business. Could you share pricing & sample info?`
        : "Hi, I would like to get a quote and sample for Master 2 Foods products."
    window.open(buildWhatsAppLink(msg), '_blank')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 grid gap-6 md:grid-cols-[1fr_1.4fr_auto] md:items-end">
      <label className="self-center font-body text-sm font-bold">
        {chinese ? '姓名' : 'Name'}
        <input
          placeholder={chinese ? '您的姓名' : 'Your name'}
          className="mt-2 w-full rounded-lg border-0 bg-background px-4 py-3 text-dark outline-none focus:ring-2 focus:ring-primary"
        />
      </label>
      <fieldset className="grid gap-3 sm:grid-cols-2">
        {chinese
          ? <legend className="mb-2 font-body text-sm font-bold">请勾选您想了解的产品</legend>
          : <legend className="sr-only">Products</legend>
        }
        {groups.map(([group, products]) => (
          <div key={group}>
            <p className="font-body text-sm font-bold">{group}</p>
            {products.map((product) => (
              <label key={product} className="flex items-center gap-2 font-body text-sm">
                <input
                  type="checkbox"
                  checked={selected.includes(product)}
                  onChange={() => toggle(product)}
                  className="h-4 w-4 accent-primary"
                />
                {product}
              </label>
            ))}
          </div>
        ))}
      </fieldset>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-lg bg-background px-6 py-4 text-sm font-body font-bold uppercase text-dark transition-colors hover:bg-primary hover:text-background"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={whatsappIcon} alt="" aria-hidden="true" className="mr-2 h-4 w-4 object-contain" />
        {chinese ? '获取样品与报价' : 'Get a quote & sample'}
      </button>
    </form>
  )
}
