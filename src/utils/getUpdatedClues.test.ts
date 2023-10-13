import { describe, expect, test } from 'vitest'
import { getUpdatedClues } from './getUpdatedClues'

const clue = (value: number, solved = false) => ({ value, solved })

describe('getUpdatedClues', () => {
  test('returns unsolved clues if empty line', () => {
    const clues = getUpdatedClues([clue(3), clue(2)], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    expect(clues).toEqual([clue(3), clue(2)])
  })

  test('returns solved clues if exact match', () => {
    const clues = getUpdatedClues([clue(3), clue(2)], [2, 2, 2, 0, 0, 0, 2, 2, 0, 0])
    expect(clues).toEqual([clue(3, true), clue(2, true)])
  })

  test('returns solved clues if entire line filled', () => {
    const clues = getUpdatedClues([clue(10)], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2])
    expect(clues).toEqual([clue(10, true)])
  })

  test('returns unsolved clues if not exact match', () => {
    const clues = getUpdatedClues([clue(3), clue(2)], [2, 2, 2, 0, 0, 2, 0, 0, 2, 2])
    expect(clues).toEqual([clue(3), clue(2)])
  })

  test('returns partially solved clues at the beginning', () => {
    const clues = getUpdatedClues([clue(3), clue(2)], [2, 2, 2, 0, 0, 2, 0, 0, 0, 0])
    expect(clues).toEqual([clue(3, true), clue(2)])
  })

  test('returns partially solved clues at the end', () => {
    const clues = getUpdatedClues([clue(3), clue(2)], [0, 2, 2, 0, 0, 0, 0, 0, 2, 2])
    expect(clues).toEqual([clue(3), clue(2, true)])
  })

  test('returns unsolved clues if more groups than clues', () => {
    const clues = getUpdatedClues([clue(3), clue(2)], [0, 2, 2, 0, 0, 2, 0, 2, 0, 0])
    expect(clues).toEqual([clue(3), clue(2)])
  })

  test('returns partially solved clues if match in the middle', () => {
    const clues = getUpdatedClues(
      [clue(3), clue(1), clue(1)],
      [1, 2, 2, 2, 0, 0, 0, 2, 1, 1]
    )
    expect(clues).toEqual([clue(3, true), clue(1), clue(1, true)])
  })

  test('returns empty array if no clues', () => {
    const clues = getUpdatedClues([], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    expect(clues).toEqual([])
  })
})
