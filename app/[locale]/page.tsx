import type { Metadata } from 'next'
import Image from 'next/image'
import { ChefsCarousel } from '@/components/landing-page/chefs-carousel'
import { HomeCTAForm } from '@/components/sections/home-cta-form'
import { seoAlternates } from '@/lib/seo'
import type { Locale } from '@/lib/i18n/config'

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'en'
      ? 'Master 2 | Asian Sauces & Noodles Supplier'
      : 'Master 2 | 亚洲酱料与面条供应商',
    description: locale === 'en'
      ? 'Specialty sauces, noodles and pre-made ingredients for commercial kitchens in Singapore since 1996.'
      : '自1996年起为新加坡商业厨房提供特色酱料、面条及预制食材。',
    alternates: seoAlternates(`/${locale}`),
  }
}

const whatsappIcon = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2816%29-0mAmlacFMUy5i9YmrEj5pgq7qRU3bC.png'

const sharedAssets = {
  chefTaiLokMee: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2848%29-KgGk9lpwmLDAj3V0KIv6UjRklTFo2U.png',
  chefSauce: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2850%29-KC9HvBpI9Ih6aoXIVeS66lnZ4hxHsr.png',
  chefEeMee: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2856%29-yWRo9RjpAIzWKHPiIw7SV2v0hczSl9.png',
  yamRing: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2852%29-lwIYO7WC9KkRZ4dEr455rJtzBgjvmX.png',
  prawnRoll: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2853%29-ZxBlCjCj3ReF7qNfyTmwagKFI0GkcK.png',
  completeSauce: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2859%29-nXeL5VJDhCNAN9dInDeqb4NnvPFRWW.png',
  porkLard: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2847%29-FKtIb5rhxzqgenNEKwGb0Tot7vBKKk.png',
  sauces: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2857%29-vfR8igoUDh2c22QcgR2oJCmHOiMvr1.png',
  noodles: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2877%29-3OhpM2Luw8mTElBJIe1QrXS6HBfpX4.png',
  dessert: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2876%29-2OGyveLMxSpNSVEDF8k1aKcpQ3U826.png',
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  const zh = locale === 'zh'

  const heroImage = zh
    ? 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2875%29-jtFwshvhJFMMqEcTiwwKLvT0LHOHpZ.png'
    : 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2f%20web%20%26%20LP%20%2874%29-ub34JIkUWwizpFoG8cWTDEsNkjP7YG.png'

  const chefs = zh
    ? [
        { name: '大碌面', image: sharedAssets.chefTaiLokMee, href: `/${locale}/chinese-noodle` },
        { name: '特浓香老抽', image: sharedAssets.chefSauce, href: `/${locale}/chinese-braises` },
        { name: '伊面', image: sharedAssets.chefEeMee, href: `/products?sub=noodles` },
      ]
    : [
        { name: 'Tai Lok Mee', image: sharedAssets.chefTaiLokMee, href: `/${locale}/english-noodle` },
        { name: 'Fragrant Dark Soya Sauce', image: sharedAssets.chefSauce, href: `/${locale}/english-braises` },
        { name: 'Ee Mee', image: sharedAssets.chefEeMee, href: `/products?sub=noodles` },
      ]

  const prep = zh
    ? [
        { name: '芋头圈', image: sharedAssets.yamRing },
        { name: '冷冻虾卷', image: sharedAssets.prawnRoll },
        { name: '成品咖喱酱料', image: sharedAssets.completeSauce },
        { name: '猪油', image: sharedAssets.porkLard },
      ]
    : [
        { name: 'Yam Ring Basket', image: sharedAssets.yamRing },
        { name: 'Frozen Prawn Roll', image: sharedAssets.prawnRoll },
        { name: 'Complete Sauces', image: sharedAssets.completeSauce },
        { name: 'Pork Lard', image: sharedAssets.porkLard },
      ]

  return (
    <main className="min-h-screen bg-background text-dark">
      <h1 className="sr-only">
        {zh
          ? 'Master 2 — 新加坡亚洲酱料、面条及食材批发供应商'
          : 'Master 2 — Wholesale Asian Sauces, Noodles & Ingredients Supplier Singapore'}
      </h1>

      {/* Hero */}
      <section className="flex justify-center">
        <div className="relative w-4/5 aspect-[4/3]">
          <Image
            src={heroImage}
            alt="Master 2 Foods specialty sauces, noodles and ready-made ingredients"
            fill
            priority
            className="object-contain"
            sizes="80vw"
          />
        </div>
      </section>

      {/* Sticky CTA bar */}
      <div className="flex justify-center bg-background px-4 py-1.5">
        <a
          href="#cta"
          className="inline-flex items-center justify-center rounded-lg bg-secondary px-3 py-2 text-[10px] font-body font-bold uppercase tracking-wide text-dark transition-colors hover:bg-secondary-dark"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={whatsappIcon} alt="" aria-hidden="true" className="mr-2 h-4 w-4 object-contain" />
          {zh ? '获取样品与报价' : 'Get a quote & sample'}
        </a>
      </div>

      {/* What Chefs Are Saying */}
      <section className="container-pad px-4 py-6 md:py-12">
        <h2 className="font-heading text-xl font-bold leading-none text-dark md:text-4xl">
          {zh
            ? '同行真实评价'
            : <>What <span className="font-subheading-two text-primary not-italic">Chefs</span> Are Saying</>
          }
        </h2>
        <div className="mt-3">
          <ChefsCarousel products={chefs} />
        </div>
      </section>

      {/* Specialty Braising Sauces */}
      <section className="px-4 py-6 md:py-12">
        <div className="container-pad">
          <h2 className="font-heading text-xl font-bold tracking-[0.01em] md:text-4xl">
            {zh
              ? <><span className="font-subheading-two text-primary not-italic">焖炖酱料</span>与常用调料</>
              : <><span className="font-subheading-two text-primary not-italic">Specialty</span> Braising Sauces &amp; Staples</>
            }
          </h2>
          <a href={`/${locale}/${zh ? 'chinese' : 'english'}-braises`} className="block">
            <div className="relative mt-6 aspect-[4/3] w-full">
              <Image src={sharedAssets.sauces} alt={zh ? '特浓黑酱油与卤味调料' : 'Specialty braising sauces and finished dishes'} fill className="object-contain" sizes="100vw" />
            </div>
          </a>
          <p className="mt-4 text-center font-subheading text-sm">
            {zh ? '特浓黑酱油 卤味必备调料' : 'Extra-Concentrated Dark Soy Sauce & Braising Essentials'}
          </p>
          <p className="text-center font-subheading text-xs">
            {zh ? '麻油 • 醋 • 酱油 • 酱类' : 'Sesame Oil • Vinegar • Soy Sauce • Pastes'}
          </p>
        </div>
      </section>

      {/* Heritage Signature Noodles */}
      <section className="container-pad px-4 py-6 md:py-12">
        <h2 className="font-heading text-xl font-bold tracking-[0.01em] md:text-4xl">
          {zh
            ? '招牌面条'
            : <><span className="font-subheading-two text-primary not-italic">Heritage</span> Signature Noodles</>
          }
        </h2>
        <p className="mt-3 font-subheading">
          {zh ? '传统工艺制作，餐馆后厨常用之选。' : 'Chosen by Restaurants for 30 Years'}
        </p>
        <a href={`/${locale}/${zh ? 'chinese' : 'english'}-noodle`} className="block">
          <div className="relative mt-6 aspect-[16/9] w-full">
            <Image src={sharedAssets.noodles} alt={zh ? '招牌面条与面食' : 'Heritage signature noodles and noodle dishes'} fill className="object-contain" sizes="100vw" />
          </div>
        </a>
        <p className="mt-4 text-center font-subheading text-sm">
          {zh ? '特色面' : 'Master 2 Foods Specialty Noodle'}
        </p>
        <p className="text-center font-subheading text-xs">
          {zh
            ? '吉隆坡福建面 • 伊面 伊府面 • 香港面 • 炸生'
            : '大陆面 KL Thick Hokkien noodle • Ee Mee • Hongkong Noodle • Fried Crispy Noodle'}
        </p>
      </section>

      {/* Efficient Prepped Ingredients */}
      <section className="px-4 py-6 md:py-12">
        <div className="container-pad">
          <h2 className="font-heading text-xl font-bold tracking-[0.01em] md:text-4xl">
            {zh
              ? '预处理食材'
              : <><span className="font-subheading-two text-primary not-italic">Efficient</span> Prepped Ingredients</>
            }
          </h2>
          <p className="mt-3 font-subheading">
            {zh ? '省力不省味' : 'Cut hours of labour without compromising authentic flavour.'}
          </p>
          <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {prep.map(({ name, image }) => (
              <article key={name}>
                <div className="relative aspect-square">
                  <Image src={image} alt={name} fill className="object-contain" sizes="(min-width: 1024px) 25vw, 50vw" />
                </div>
                <h3 className="text-center font-body text-sm italic">{name}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ready-Made Dessert */}
      <section className="px-4 py-6 md:py-12">
        <div className="container-pad grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-xl font-bold tracking-[0.01em] md:text-4xl">
              {zh ? <>即食甜品<br />加热即食</> : 'Ready-Made Dessert'}
            </h2>
          </div>
          <div>
            <div className="relative aspect-square">
              <Image src={sharedAssets.dessert} alt={zh ? '白果芋泥' : 'Yam Paste with Ginkgo'} fill className="object-contain" sizes="50vw" />
            </div>
            <p className="mt-4 text-center font-subheading text-xs">
              {zh ? '白果芋泥' : 'Yam Paste with Ginkgo'}
            </p>
            <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-3">
              {(zh
                ? ['中式宴席甜品', '加热即可上桌', '口感绵密、味道地道']
                : ['Heat & Serve.', 'Authentic Orh Nee without hours of work.', 'Used by Cantonese restaurants.']
              ).map((text) => (
                <p key={text} className="rounded-lg border border-primary p-2 font-subheading text-xs leading-tight">{text}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="bg-secondary px-4 py-6 md:py-12">
        <div className="container-pad">
          <h2 className="font-heading text-xl font-bold tracking-[0.01em] text-primary md:text-4xl">
            {zh ? '餐厅供货咨询' : 'F&B Ingredient Supply Enquiry'}
          </h2>
          <p className="mt-2 font-subheading text-base text-dark md:text-xl">
            {zh ? '无起订要求・每周送货' : 'Enquire today for price list & samples. No MOQ, weekly delivery.'}
          </p>
          <HomeCTAForm chinese={zh} />
        </div>
      </section>

      {/* Trusted Kitchen Partner */}
      <section className="container-pad px-4 py-6 md:py-12">
        <h2 className="font-heading text-xl font-bold tracking-[0.01em] md:text-4xl">
          {zh
            ? '值得信赖的厨房伙伴'
            : <>Your <span className="font-subheading-two text-primary not-italic">Trusted</span> Kitchen Partner</>
          }
        </h2>
        <div className="mt-5 max-w-3xl space-y-3 font-body leading-relaxed">
          {zh ? (
            <>
              <p>自 1996 年起，二爷食品一路陪伴新加坡餐饮业：小贩、餐馆、外烩、食堂与酒店。</p>
              <p>我们懂后厨所需：不只是味道好，更要供货稳、品质稳、用得省心。品控与配送交给我们，您只管专心做菜。</p>
            </>
          ) : (
            <>
              <p>Since 1996, Master 2 Foods has stood alongside professional kitchens across Singapore, hawkers, restaurants, caterers, canteens, and hotels.</p>
              <p>Great flavour matters, and so does steady supply, consistent quality, and reliable service. Quality checks and dependable delivery are handled in-house, so kitchens can focus on cooking.</p>
            </>
          )}
        </div>
        <p className="mt-5 font-body font-bold">
          {zh ? '我们懂后厨、重传统风味' : '30 years of helping Singapore kitchens run smoother.'}
        </p>
        {zh && <p className="mt-2 font-body font-bold">三十年来，实实在在帮新加坡厨房做得更顺。</p>}
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {zh ? (
            <>
              <article className="rounded-lg border border-primary p-4 font-body text-sm leading-relaxed">
                <h3 className="font-bold">专为后厨优化酱品</h3>
                <p className="mt-3">特浓焖炖酱料：醇厚平衡、咸度适中、绝不齁咸。色泽红亮、风味醇厚、锅锅品质一致。另有完整即用酱系列：咖喱、鱼咖喱、鸡咖喱等多种风味。</p>
                <p className="mt-3 font-bold">配方更用心，出品更稳定。</p>
              </article>
              <article className="rounded-lg border border-primary p-4 font-body text-sm leading-relaxed">
                <h3 className="font-bold">招牌面条，三十年匠心之选</h3>
                <p className="mt-3">为每道菜肴赋予独特风味：伊面、KL 大碌面、生面有蛋／无蛋可选。口感筋道弹牙、质感分明、香气自然。让食客记住面食香味，频频回头。</p>
              </article>
              <article className="rounded-lg border border-primary p-4 font-body text-sm leading-relaxed">
                <h3 className="font-bold">省时省力，风味不变</h3>
                <p className="mt-3">我们的预处理即用食材、酱料、芋头圈、芋泥甜品、冷冻虾卷等，均提前备好，为厨房省下大量备料工时。</p>
                <p className="mt-3 font-bold">少备料，多做菜。</p>
              </article>
            </>
          ) : (
            <>
              <article className="rounded-lg border border-primary p-4 font-body text-sm leading-relaxed">
                <h3 className="font-bold">Chef-grade Sauces, Improved for Kitchens</h3>
                <p className="mt-3">Extra-concentrated braising sauces: rich, balanced, never overly salty. Delivers perfect colour, depth, and consistency every time. Complete ready-to-serve sauces also available, curry, fish curry, chicken curry, and more.</p>
                <p className="mt-3 italic">Better recipe, better result.</p>
              </article>
              <article className="rounded-lg border border-primary p-4 font-body text-sm leading-relaxed">
                <h3 className="font-bold">Specialty Noodles, Our 30 Years Signature</h3>
                <p className="mt-3">Yee Mee, KL Tai Lok Mee, Sheng Mian, egg or egg-free. Firm bite, distinct texture, natural fragrance. Noodles that give every dish its own character, so flavours remain memorable and keep customers returning.</p>
              </article>
              <article className="rounded-lg border border-primary p-4 font-body text-sm leading-relaxed">
                <h3 className="font-bold">Save Preparation Time, Without Compromising Flavour</h3>
                <p className="mt-3">Ready-to-use processed ingredients, complete sauces, yam ring baskets, yam paste dessert, frozen prawn rolls, all prepared ahead to cut kitchen labour hours.</p>
                <p className="mt-3 italic">Less prep, more cooking.</p>
              </article>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
