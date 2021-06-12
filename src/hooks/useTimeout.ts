import { useCallback, useEffect, useState } from 'react'

type UseTimeoutType = {
  setTimeout: (callback: () => void, milliseconds: number) => void
  clearTimeout: () => void
}

export const useTimeout = (): UseTimeoutType => {
  const [timeout, setTimeoutValue] = useState<number | null>(null)

  const setTimeout = useCallback<UseTimeoutType['setTimeout']>(
    (callback, milliseconds) => {
      setTimeoutValue((prevTimeout) => {
        if (prevTimeout) window.clearTimeout(prevTimeout)
        return window.setInterval(callback, milliseconds)
      })
    },
    []
  )

  const clearTimeout = useCallback<UseTimeoutType['clearTimeout']>(() => {
    setTimeoutValue(null)
  }, [])

  useEffect(() => {
    const prevTimeout = timeout
    return () => {
      if (prevTimeout) window.clearTimeout(prevTimeout)
    }
  }, [timeout])

  return {
    setTimeout,
    clearTimeout,
  }
}
