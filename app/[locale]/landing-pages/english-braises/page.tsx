import Image from 'next/image'
import type { Metadata } from 'next'
import { SITE, WHATSAPP_BASE } from '@/lib/constants/site'
import type { Locale } from '@/lib/i18n/config'

export const metadata: Metadata = {
  title: 'English Braises | Master 2 Foods',
  description: 'Extra rich braising ingredients for chefs and food businesses.',
}

function buildWhatsAppLink(message: string) {
  return `${WHATSAPP_BASE}${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`
}

type LandingVariant = 'english' | 'chinese' | 'english-noodle' | 'chinese-noodle'

const whatsappIconUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2816%29-0mAmlacFMUy5i9YmrEj5pgq7qRU3bC.png'

const englishDetails = [
  { highlight: 'Rich', text: ' reddish tint that gives dishes a glossy, appetizing finish' },
  { highlight: 'Bold', text: ' umami taste, not overly salty, savoury and smooth, with deep caramel notes' },
  { highlight: 'concentrated', text: ' for kitchen use' },
  { highlight: 'Aged longer', text: ' than regular light soy for a deeper flavour that holds up in slow-cooked dishes' },
]

const chineseDetails = [
  { highlight: '上色出众，卖相稳', text: ' 久焖不暗沉、不发黑，成品红亮诱人，卖相整齐好看，看了就有食欲' },
  { highlight: '风味纯正', text: ' 味道鲜而不齁咸，不靠重盐提鲜。入口醇厚鲜香，带着自然温润的焦香甜香' },
  { highlight: '质地浓稠', text: ' 用量省，少量就够色、够香、够味。' },
]

const englishNoodleDetails = [
  { highlight: 'Soaks up rich gravy', text: ' without turning mushy. Able to carry balanced flavour through every single bite.' },
  { highlight: 'Does not break apart easily', text: ' when stir fried in wok.' },
  { highlight: 'Suitable for high-heat stir-frying', text: ' or longer braising.' },
]

const chineseNoodleDetails = [
  { highlight: '吸汁力强', text: ' 焖久不糊烂，口口入味' },
]

const heroImages: Record<LandingVariant, string> = {
  english: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2829%29-CW3V95515MzLZw2Qry4lgibhE6FVJf.png',
  chinese: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2830%29-X65CmU1zxcAF8IJbuGuMc3Jyc9tXUQ.png',
  'english-noodle': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2832%29-19MmWADj6x3O4LLoC9iaZDbMEpPTSF.png',
  'chinese-noodle': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2831%29-RwIjGAHA6aBAukiRkTgxhcedPjLg6E.png',
}

const productImages: Record<string, string> = {
  sauce: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2828%29-7hxdvocUkEiem1dfMd8j5c9M0dkL8a.png',
  noodle: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2820%29-6TIUC6idELaT3nyvHnRHZvL73F74bW.png',
}

const englishDishes = [
  { name: 'Braised Duck', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dish_braisedduck-Z2XtDaXF3Md3rTSZx9RqN5AVgJmVAo.png' },
  { name: 'Braised Pork', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dish_braisedpork-QXebZSsms10fT8tkZhRbDKTEX73zig.png' },
]

const chineseDishes = [
  { name: 'Braised Duck', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/braised%20pork%20chi-0yIQWCMfu1s5oJsjHoP2vqWi40HiFE.png' },
  { name: 'Braised Pork', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/braised%20duck%20chi-dvzIKN0UdEFkoxsjEHzdriI2sETkls.png' },
]

export function LandingPageTemplate({ variant = 'english' }: { variant?: LandingVariant }) {
  const chinese = variant === 'chinese' || variant === 'chinese-noodle'
  const noodle = variant === 'english-noodle' || variant === 'chinese-noodle'

  const quoteMessage = chinese
    ? noodle ? '您好，我想了解大碌面的报价和样品。' : '您好，我想了解特浓香老抽的报价和样品。'
    : noodle ? 'Hi, I would like to get a quote and sample for KL Hokkien Noodle.' : 'Hi, I would like to get a quote and sample for English Braises.'
  const quoteLink = buildWhatsAppLink(quoteMessage)

  const details = variant === 'chinese' ? chineseDetails : variant === 'english-noodle' ? englishNoodleDetails : variant === 'chinese-noodle' ? chineseNoodleDetails : englishDetails
  const dishes = chinese && !noodle ? chineseDishes : englishDishes

  const pageTitle = variant === 'chinese-noodle' ? '正宗吉隆坡福建面专用面'
    : variant === 'english-noodle' ? 'Tai Lok Mee KL Hokkien Noodle'
    : chinese ? '特浓香老抽'
    : 'Extra Rich fragrant dark soya sauce'

  const productDescription = variant === 'chinese-noodle' ? '宽厚粗切，口感软润却筋道弹牙。马来西亚传统工艺制作。高温煮炒不易断、久焖不易软塌。'
    : variant === 'english-noodle' ? 'Thick-cut noodle with a soft yet satisfyingly firm bite. Bright yellow, broad shape, crafted the traditional way in Malaysia.'
    : chinese ? '浓郁醇厚，色泽亮丽，让每一道焖炖菜肴更诱人。'
    : 'Deeper flavour, colour, and a glossier finish on every braised dish.'

  const bestUsedCopy = variant === 'chinese-noodle' ? '专为正宗吉隆坡福建面而制: 黑酱油焖、大火炒、慢卤久煮都合适。'
    : variant === 'english-noodle' ? 'Authentic KL-style Hokkien Mee, braised in dark soya gravy, stir-fried, or slow-cooked. The noodle that delivers the texture your guests recognise and return for.'
    : ''

  const quoteText = chinese ? '获取样品与报价' : 'Get a quote & sample'
  const ctaTitle = chinese ? '想亲自试试？' : 'Interested?'
  const ctaDescription = chinese ? '欢迎联系我们获取价目表与样品。无最低起订量，每周配送。' : 'Enquire today for price list & samples. No MOQ, weekly delivery.'

  return (
    <main className="min-h-screen bg-background text-dark">
      {/* Hero */}
      <section className="relative aspect-[16/9] overflow-hidden bg-background">
        <Image
          src={heroImages[variant]}
          alt="Landing page product hero"
          fill
          priority
          quality={90}
          className="object-contain object-center mix-blend-multiply"
          sizes="100vw"
        />
      </section>

      {/* Sticky CTA bar */}
      <div className="flex justify-center bg-background px-4 py-1.5 md:px-8 md:py-3">
        <a
          href="#cta"
          className="inline-flex items-center justify-center rounded-lg bg-secondary px-3 py-2 text-[10px] font-body font-bold uppercase tracking-wide text-dark transition-colors hover:bg-secondary-dark md:px-6 md:py-3 md:text-sm"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={whatsappIconUrl} alt="" aria-hidden="true" className="mr-2 h-4 w-4 object-contain" />
          {quoteText}
        </a>
      </div>

      {/* Product details */}
      <section className="container-pad py-6 sm:py-8 md:py-12">
        <div className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
          <div className="relative mx-auto aspect-square w-full max-w-sm rounded-xl md:max-w-lg">
            <Image
              src={noodle ? productImages.noodle : productImages.sauce}
              alt="Product image"
              fill
              quality={90}
              className="object-contain"
              sizes="(min-width: 768px) 40vw, 90vw"
            />
          </div>
          <div className="text-justify">
            <h1 className="max-w-xl font-heading font-bold text-xl leading-tight text-dark md:text-4xl">{pageTitle}</h1>
            <p className="mt-4 font-body text-xs leading-tight text-dark md:text-base">{productDescription}</p>
            <p className="mt-4 font-body text-xs leading-relaxed">
              <span className="font-semibold">{chinese ? '配料：' : 'Ingredients:'}</span><br />
              {chinese ? '水、大豆、盐、小麦粉、糖。' : 'Water, soybeans, salt, wheat flour, sugar.'}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {details.map((detail) => (
                <div key={detail.highlight} className="rounded-lg border-2 border-primary p-2 text-left text-[11px] leading-tight font-body md:p-3 md:text-sm">
                  <strong className="font-bold">{detail.highlight}</strong>{detail.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Best used for */}
      <section className="container-pad py-4 sm:py-6 md:py-8">
        <h2 className="mb-3 max-w-xs font-heading font-bold text-xl leading-tight text-dark md:text-4xl">
          {chinese ? '适用推荐' : 'Best Used For'}
        </h2>
        {noodle ? (
          <div>
            <p className="max-w-2xl font-body text-xs leading-relaxed md:text-base">{bestUsedCopy}</p>
            <div className="relative mt-3 aspect-[2.5/1] w-full max-w-5xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2824%29-gLzk3JI22Ccg8xxG3J9ACmFwE0xs44.png"
                alt="Authentic KL Hokkien Mee dishes"
                fill
                className="object-contain object-left"
                sizes="100vw"
              />
            </div>
            <div className="mt-8">
              <h3 className="font-heading text-xl font-bold text-dark md:text-3xl">
                {chinese ? '地道福建面三件套' : 'The Authentic KL Hokkien Mee Trio'}
              </h3>
              <p className="mt-1 font-body text-sm md:text-base">
                {chinese ? '面・酱・峇拉煎 - 配齐就够味' : 'Noodle, sauce, and belacan.'}
              </p>
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <article>
                  <div className="relative mx-auto aspect-square w-full max-w-sm">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2819%29-4dsuId4Mw4jkWNyYmWBKB3FFMfMpa9.png"
                      alt="Fragrant dark soya sauce"
                      fill
                      className="object-contain"
                      sizes="(min-width: 640px) 40vw, 90vw"
                    />
                  </div>
                  <p className="mt-2 text-center font-body text-sm font-bold md:text-base">
                    {chinese ? '老抽焖制・厨房特浓版' : 'Braised in our Fragrant Dark Soya Sauce, made Extra Thick for Kitchens'}
                  </p>
                </article>
                <article>
                  <div className="relative mx-auto aspect-square w-full max-w-sm">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2821%29-T2FO2SW07anoGk51ZuBx6g3roecUNA.png"
                      alt="Belacan"
                      fill
                      className="object-contain"
                      sizes="(min-width: 640px) 40vw, 90vw"
                    />
                  </div>
                  <p className="mt-2 text-center font-body text-sm font-bold md:text-base">
                    {chinese ? '峇拉煎提鲜・风味点睛' : 'Finish with a punch of bold Belacan'}
                  </p>
                </article>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-1 sm:grid-cols-2">
            {dishes.map((dish) => (
              <div key={dish.name} className="block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-contain"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA form */}
      <section id="cta" className="bg-secondary px-4 py-12 sm:py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="max-w-3xl font-heading font-bold text-2xl leading-tight text-primary md:text-5xl">{ctaTitle}</h2>
          <p className="mt-2 max-w-3xl font-body text-base leading-tight text-dark md:text-xl">{ctaDescription}</p>
          <form action={quoteLink} method="get" target="_blank" className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end">
            <label className="flex-1 font-body text-sm font-bold">
              {chinese ? '您的姓名' : 'Name'}
              <input
                name="name"
                placeholder={chinese ? '您的姓名' : 'Your name'}
                className="mt-2 w-full rounded-lg border-0 bg-background px-4 py-3 font-body text-dark outline-none ring-2 ring-transparent focus:ring-primary"
              />
            </label>
            {noodle && (
              <fieldset className="flex-1 space-y-2 font-body text-sm">
                <legend className="font-bold">{chinese ? '产品' : 'Products'}</legend>
                {['KL Tai Lok Mee', 'Dark Soy Sauce [XLC]', 'Sambal Belacan'].map((product) => (
                  <label key={product} className="flex items-center gap-2 font-bold">
                    <input type="checkbox" name="products" value={product} className="h-4 w-4 accent-primary" />
                    {product}
                  </label>
                ))}
              </fieldset>
            )}
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-background px-6 py-4 text-sm font-body font-bold uppercase text-dark transition-colors hover:bg-primary hover:text-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={whatsappIconUrl} alt="" aria-hidden="true" className="mr-2 h-4 w-4 object-contain" />
              {quoteText}
            </button>
          </form>
        </div>
      </section>

      {/* Trusted kitchen partner */}
      <section className="container-pad py-6 sm:py-8 md:py-12">
        <h2 className="max-w-xl font-heading font-bold text-xl leading-tight text-dark md:text-4xl">
          {chinese ? '值得信赖的厨房伙伴' : 'Your Trusted Kitchen Partner'}
        </h2>
        <div className="mt-4 max-w-none space-y-3 font-body text-xs leading-relaxed text-dark md:text-sm">
          <p>{chinese ? '自 1996 年起，二爷食品一路陪伴新加坡餐饮业: 小贩、餐馆、外烩、食堂与酒店。' : 'Since 1996, Master 2 Foods has stood alongside professional kitchens across Singapore, hawkers, restaurants, caterers, canteens, and hotels.'}</p>
          <p>{chinese ? '我们懂后厨所需：不只是味道好，更要供货稳、品质稳、用得省心。品控与配送交给我们，您只管专心做菜。' : 'Great flavour matters, and so does steady supply, consistent quality, and reliable service. Quality checks and dependable delivery are handled in-house, so kitchens can focus on cooking.'}</p>
        </div>
        <p className="mt-5 font-body text-sm font-bold leading-relaxed text-dark md:text-base">
          {chinese ? '我们懂后厨、重传统风味' : '30 years of helping Singapore kitchens run smoother.'}
        </p>
        {chinese && <p className="mt-2 font-body text-sm font-bold leading-relaxed text-dark md:text-base">三十年来，实实在在帮新加坡厨房做得更顺。</p>}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <article className="rounded-lg border border-primary p-3 font-body text-[11px] leading-relaxed text-dark">
            <h3 className="mb-2 font-bold">{chinese ? '专为后厨优化酱品' : 'Chef-grade Sauces, Improved for Kitchens'}</h3>
            <p>{chinese ? '特浓焖炖酱料：醇厚平衡、咸度适中、绝不齁咸。色泽红亮、风味醇厚、锅锅品质一致。另有完整即用酱系列: 咖喱、鱼咖喱、鸡咖喱等多种风味。' : 'Extra-concentrated braising sauces: rich, balanced, never overly salty. Delivers perfect colour, depth, and consistency every time. Complete ready-to-serve sauces also available, curry, fish curry, chicken curry, and more.'}</p>
            <p className="mt-2 font-bold">{chinese ? '配方更用心，出品更稳定。' : 'Better recipe, better result.'}</p>
          </article>
          <article className="rounded-lg border border-primary p-3 font-body text-[11px] leading-relaxed text-dark">
            <h3 className="mb-2 font-bold">{chinese ? '招牌面条, 三十年匠心之选' : 'Specialty Noodles, Our 30 Years Signature'}</h3>
            <p>{chinese ? '为每道菜肴赋予独特风味：伊面、KL 大碌面、生面: 有蛋 / 无蛋可选。口感筋道弹牙、质感分明、香气自然。让食客记住味道口感、频频回头。' : 'Yee Mee, KL Tai Lok Mee, Sheng Mian, egg or egg-free. Firm bite, distinct texture, natural fragrance. Noodles that give every dish its own character, so flavours remain memorable and keep customers returning.'}</p>
          </article>
          <article className="rounded-lg border border-primary p-3 font-body text-[11px] leading-relaxed text-dark">
            <h3 className="mb-2 font-bold">{chinese ? '省时省力・风味不变' : 'Save Preparation Time, Without Compromising Flavour'}</h3>
            <p>{chinese ? '我们的预处理即用食材，酱料、芋头圈、芋泥甜品、冷冻虾卷等，均提前备好，为厨房省下大量备料工时。' : 'Ready-to-use processed ingredients, complete sauces, yam ring baskets, yam paste dessert, frozen prawn rolls, all prepared ahead to cut kitchen labour hours.'}</p>
            <p className="mt-2 font-bold">{chinese ? '少备料，多做菜。' : 'Less prep, more cooking.'}</p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default function EnglishBraisesPage() {
  return <LandingPageTemplate variant="english" />
}
