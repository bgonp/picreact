import { describe, expect, test } from 'vitest'

import { createUrl } from './createUrl'

describe('createUrl', () => {
  test('returns complete url with same path if no params', () => {
    expect(createUrl('/sample/url', {})).toBe('http://localhost:3000/sample/url')
  })

  test('returns url with replaced params', () => {
    expect(createUrl('/root/:foo/:fizz', { foo: 'bar', fizz: 'buzz' })).toBe(
      'http://localhost:3000/root/bar/buzz'
    )
  })

  test('removes no defined params', () => {
    expect(createUrl('/root/:foo/:fizz', { fizz: 'buzz' })).toBe(
      'http://localhost:3000/root/buzz'
    )
  })
})
