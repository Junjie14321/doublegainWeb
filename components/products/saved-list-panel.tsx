'use client'

import Image from 'next/image'
import { useLanguage } from '@/context/language-context'
import { useSavedList } from '@/context/saved-list-context'
import { savedListLink } from '@/lib/whatsapp'

interface SavedListPanelProps {
  onClose: () => void
}

export function SavedListPanel({ onClose }: SavedListPanelProps) {
  const { locale, t } = useLanguage()
  const { savedItems, toggle } = useSavedList()

  const handleWhatsApp = () => {
    const names = savedItems.map((p) => p.name[locale])
    window.open(savedListLink(names, locale), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="fixed top-16 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 bg-white rounded-xl shadow-2xl border border-border-color overflow-hidden max-h-[calc(100vh-100px)] flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-color flex-shrink-0">
        <h2 className="font-ui text-xs md:text-sm text-text-primary uppercase tracking-wide">
          {t.savedList.title}
        </h2>
        <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors" aria-label="Close">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="overflow-y-auto flex-1 min-h-0">
        {savedItems.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <svg className="w-10 h-10 text-border-color mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <p className="text-sm font-ui text-text-secondary">{t.savedList.empty}</p>
            <p className="text-xs text-text-muted mt-1">{t.savedList.emptySubtitle}</p>
          </div>
        ) : (
          <ul className="divide-y divide-border-color">
            {savedItems.map((item) => (
              <li key={item.id} className="flex items-center gap-3 px-4 py-3">
                <div className="w-12 h-12 flex-shrink-0 bg-surface rounded overflow-hidden border border-border-color">
                  {item.image ? (
                    <Image src={item.image} alt={item.name[locale]} width={48} height={48} className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-text-muted opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-heading text-text-primary truncate">{item.name[locale]}</p>
                  {item.grade && (
                    <p className="text-xs font-body text-text-muted mt-0.5 capitalize">{item.grade.replace('-', ' ')}</p>
                  )}
                </div>
                <button
                  onClick={() => toggle(item)}
                  className="flex-shrink-0 text-text-muted hover:text-primary transition-colors"
                  aria-label={t.savedList.remove}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {savedItems.length > 0 && (
        <div className="p-4 border-t border-border-color flex-shrink-0">
          <button
            onClick={handleWhatsApp}
            className="w-full bg-primary hover:bg-primary-dark text-white font-heading text-xs md:text-sm py-3 px-4 rounded-lg transition-colors uppercase tracking-wide flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.132.558 4.13 1.533 5.863L.057 23.57l5.861-1.508A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.91 0-3.695-.5-5.24-1.37l-.375-.22-3.478.895.93-3.373-.243-.389A9.943 9.943 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
            </svg>
            {t.savedList.sendWhatsApp}
          </button>
        </div>
      )}
    </div>
  )
}
