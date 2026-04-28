import { useState, useEffect } from 'react'

const KEY = 'projeto-x-guests'

export function useGuests() {
  const [guests, setGuests] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(guests))
  }, [guests])

  const addGuest = (name, phone) => {
    const entry = {
      id: Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      registeredAt: new Date().toLocaleString('pt-BR'),
    }
    setGuests(prev => [entry, ...prev])
    return entry
  }

  const removeGuest = (id) => {
    setGuests(prev => prev.filter(g => g.id !== id))
  }

  const clearAll = () => setGuests([])

  return { guests, addGuest, removeGuest, clearAll }
}
