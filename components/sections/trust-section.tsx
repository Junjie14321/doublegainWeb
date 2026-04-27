import { Calendar, Users, Package } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'

interface TrustSectionProps {
  dict: Dictionary
}

export function TrustSection({ dict }: TrustSectionProps) {
  const stats = [
    {
      icon: Calendar,
      value: dict.trust.years,
      label: dict.trust.yearsDesc,
    },
    {
      icon: Users,
      value: dict.trust.clients,
      label: dict.trust.clientsDesc,
    },
    {
      icon: Package,
      value: dict.trust.products,
      label: dict.trust.productsDesc,
    },
  ]

  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
          {dict.trust.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/20">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <div className="font-serif text-3xl md:text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
