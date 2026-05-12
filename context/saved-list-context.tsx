'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { SavedProduct } from '@/lib/data/products'

interface SavedListContextValue {
  savedItems: SavedProduct[]
  toggle: (product: SavedProduct) => void
  isSaved: (id: string) => boolean
  clearAll: () => void
}

const SavedListContext = createContext<SavedListContextValue | null>(null)

export function SavedListProvider({ children }: { children: ReactNode }) {
  const [savedItems, setSavedItems] = useState<SavedProduct[]>([])

  const toggle = useCallback((product: SavedProduct) => {
    setSavedItems((prev) => {
      const exists = prev.find((p) => p.id === product.id)
      if (exists) return prev.filter((p) => p.id !== product.id)
      return [...prev, product]
    })
  }, [])

  const isSaved = useCallback(
    (id: string) => savedItems.some((p) => p.id === id),
    [savedItems]
  )

  const clearAll = useCallback(() => setSavedItems([]), [])

  return (
    <SavedListContext.Provider value={{ savedItems, toggle, isSaved, clearAll }}>
      {children}
    </SavedListContext.Provider>
  )
}

export function useSavedList(): SavedListContextValue {
  const ctx = useContext(SavedListContext)
  if (!ctx) throw new Error('useSavedList must be used within SavedListProvider')
  return ctx
}
