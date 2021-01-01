import { useCallback, useState } from 'react'

export type useLocalStorageType<T> = [T, (value: T) => void, () => void]

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): useLocalStorageType<T> => {
  const [value, setValue] = useState<T>(
    (): T => {
      try {
        const value = localStorage.getItem(key)
        return value ? JSON.parse(value) : initialValue
      } catch (error) {
        console.error(error)
        return initialValue
      }
    }
  )

  const setStoredValue = useCallback<(value: T) => void>(
    (value) => {
      setValue(value)
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error(error)
      }
    },
    [key]
  )

  const removeStoredValue = useCallback<() => void>(() => {
    setValue(initialValue)
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(error)
    }
  }, [key, initialValue])

  return [value, setStoredValue, removeStoredValue]
}
