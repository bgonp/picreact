import { useEffect, useMemo, useRef } from 'react'

type UseTimeoutType = {
  setTimeout: (callback: () => void, milliseconds: number) => void
  clearTimeout: () => void
}

export const useTimeout = (): UseTimeoutType => {
  const timeoutRef = useRef<number | null>(null)

  const { setTimeout, clearTimeout } = useMemo(
    () => ({
      setTimeout: (callback: () => void, milliseconds: number) => {
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
        timeoutRef.current = window.setTimeout(() => {
          timeoutRef.current = null
          callback()
        }, milliseconds)
      },

      clearTimeout: () => {
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      },
    }),
    []
  )

  useEffect(
    () => () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    },
    []
  )

  return {
    setTimeout,
    clearTimeout,
  }
}
