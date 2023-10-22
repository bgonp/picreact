import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { useHistory } from './useHistory'

describe('useHistory', () => {
  afterEach(() => {
    window.localStorage.clear()
  })

  test('initializes empty', () => {
    const { result } = renderHook(() => useHistory<number>('id', 3))

    expect(result.current.hasHistory).toBe(false)
    expect(result.current.getEntry()).toBe(null)
  })

  test('adds and gets entries', () => {
    const { result } = renderHook(() => useHistory<string>('id', 3))

    act(() => result.current.addEntry('foo'))

    expect(result.current.hasHistory).toBe(true)
    expect(result.current.getEntry()).toBe('foo')
  })

  test('limits the number of entries', () => {
    const { result } = renderHook(() => useHistory<string>('id', 3))

    act(() => result.current.addEntry('foo'))
    act(() => result.current.addEntry('bar'))
    act(() => result.current.addEntry('fizz'))
    act(() => result.current.addEntry('buzz'))

    expect(result.current.hasHistory).toBe(true)
    act(() => expect(result.current.getEntry()).toBe('buzz'))
    act(() => expect(result.current.getEntry()).toBe('fizz'))
    act(() => expect(result.current.getEntry()).toBe('bar'))
    expect(result.current.hasHistory).toBe(false)
    expect(result.current.getEntry()).toBe(null)
  })

  test('cleans the history', () => {
    const { result } = renderHook(() => useHistory<string>('id', 3))

    act(() => result.current.addEntry('foo'))
    act(() => result.current.addEntry('bar'))
    act(() => result.current.cleanHistory())

    expect(result.current.hasHistory).toBe(false)
    expect(result.current.getEntry()).toBe(null)
  })
})
