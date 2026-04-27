import { ArrowRight } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'

interface BenefitsSectionProps {
  dict: Dictionary
}

export function BenefitsSection({ dict }: BenefitsSectionProps) {
  return (
    <section className="py-20 bg-[#451919] text-white">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-white mb-16">
          {dict.benefits.title}
        </h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {dict.benefits.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 p-6 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="flex-1 space-y-1">
                <div className="text-sm text-white/60 uppercase tracking-wide">
                  {dict.benefits.title.includes('挑战') ? '问题' : 'Problem'}
                </div>
                <p className="text-white/80">{item.problem}</p>
              </div>
              <div className="hidden md:block">
                <ArrowRight className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="text-sm text-secondary uppercase tracking-wide">
                  {dict.benefits.title.includes('解决') ? '解决方案' : 'Solution'}
                </div>
                <p className="text-white font-medium">{item.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
