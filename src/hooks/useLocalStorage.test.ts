import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { useLocalStorage } from './useLocalStorage'

describe('useLocalStorage', () => {
  afterEach(() => {
    window.localStorage.clear()
  })

  test('returns initial value', () => {
    const { result } = renderHook(() => useLocalStorage('sample', 'initial'))

    expect(result.current[0]).toBe('initial')
  })

  test('updates the value', () => {
    const { result } = renderHook(() => useLocalStorage('sample', 'initial'))

    act(() => result.current[1]('new value'))

    expect(result.current[0]).toBe('new value')
  })

  test('returns stored value', () => {
    const { unmount } = renderHook(() => useLocalStorage('sample', 'initial'))

    unmount()
    const { result } = renderHook(() => useLocalStorage('sample', 'other'))

    expect(result.current[0]).toBe('initial')
  })

  test('clears stored value', () => {
    const { result: first, unmount } = renderHook(() => useLocalStorage('sample', '1'))

    first.current[2]()
    unmount()
    const { result: secondResult } = renderHook(() => useLocalStorage('sample', '2'))

    expect(secondResult.current[0]).toBe('2')
  })
})
