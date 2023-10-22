import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { renderHook } from '@testing-library/react'

import { useTimeout } from './useTimeout'

describe('useTimeout', () => {
  beforeEach(() => void vi.useFakeTimers())

  afterEach(() => void vi.useRealTimers())

  test('runs the callback after 1s', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useTimeout())

    result.current.setTimeout(callback, 1000)
    expect(callback).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalled()
  })

  test("doesn't run the callback if clear the timeout", () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useTimeout())

    result.current.setTimeout(callback, 1000)
    result.current.clearTimeout()
    vi.advanceTimersByTime(1000)

    expect(callback).not.toHaveBeenCalled()
  })

  test('runs the callback only once', () => {
    const callback = vi.fn()
    const { result, rerender } = renderHook(() => useTimeout())

    result.current.setTimeout(callback, 1000)
    rerender()
    vi.advanceTimersByTime(5000)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('runs only the last callback if overridden', () => {
    const callback1 = vi.fn()
    const callback2 = vi.fn()
    const { result } = renderHook(() => useTimeout())

    result.current.setTimeout(callback1, 1000)
    result.current.setTimeout(callback2, 2000)

    vi.advanceTimersByTime(2000)

    expect(callback1).not.toHaveBeenCalled()
    expect(callback2).toHaveBeenCalled()
  })

  test("doesn't run the callback if unmounted", () => {
    const callback = vi.fn()
    const { result, unmount } = renderHook(() => useTimeout())

    result.current.setTimeout(callback, 1000)
    unmount()
    vi.advanceTimersByTime(1000)

    expect(callback).not.toHaveBeenCalled()
  })
})
