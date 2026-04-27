import { Clock, CheckCircle, TrendingUp } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'

interface ValueSectionProps {
  dict: Dictionary
}

export function ValueSection({ dict }: ValueSectionProps) {
  const values = [
    {
      icon: Clock,
      title: dict.value.time.title,
      description: dict.value.time.description,
    },
    {
      icon: CheckCircle,
      title: dict.value.consistency.title,
      description: dict.value.consistency.description,
    },
    {
      icon: TrendingUp,
      title: dict.value.scale.title,
      description: dict.value.scale.description,
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
          {dict.value.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div
                key={index}
                className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-6">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
