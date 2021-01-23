import { useCallback, useEffect, useState } from 'react'

type SetTimeoutType = (callback: () => void, milliseconds: number) => void

type ClearTimeoutType = () => void

type UseTimeoutType = {
  setTimeout: SetTimeoutType
  clearTimeout: ClearTimeoutType
}

export const useTimeout = (): UseTimeoutType => {
  const [timeout, setTimeoutValue] = useState<number | null>(null)

  const setTimeout = useCallback<SetTimeoutType>((callback, milliseconds) => {
    setTimeoutValue((prevTimeout) => {
      if (prevTimeout) window.clearTimeout(prevTimeout)
      return window.setInterval(callback, milliseconds)
    })
  }, [])

  const clearTimeout = useCallback<ClearTimeoutType>(() => {
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
