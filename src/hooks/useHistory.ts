import { useCallback } from 'react'

import { useLocalStorage } from 'hooks/useLocalStorage'

type UseHistoryType<T> = {
  hasHistory: boolean
  addEntry: (entry: T) => void
  getEntry: () => T | null
  cleanHistory: () => void
}

export const useHistory = <T>(
  storageId: string,
  entriesLimit: number
): UseHistoryType<T> => {
  const [history, setHistory, clearHistory] = useLocalStorage(storageId, [] as T[])

  const hasHistory = history.length > 0

  const addEntry = useCallback(
    (newEntry: T) => {
      setHistory((entries) => [newEntry, ...entries].slice(0, entriesLimit))
    },
    [entriesLimit, setHistory]
  )

  const getEntry = useCallback(() => {
    if (!hasHistory) return null
    const [entry, ...nextHistory] = history
    setHistory(nextHistory)
    return entry as T
  }, [hasHistory, history, setHistory])

  const cleanHistory = useCallback(() => {
    clearHistory()
    setHistory([])
  }, [clearHistory, setHistory])

  return { hasHistory, addEntry, getEntry, cleanHistory }
}
