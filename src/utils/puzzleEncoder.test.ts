import { decodePuzzle, encodePuzzle } from './puzzleEncoder'
import { describe, expect, test } from 'vitest'

const clue = (value: number, solved = false) => ({ value, solved })

const puzzle = {
  columns: [
    [clue(7), clue(2)],
    [clue(4), clue(2)],
    [clue(0, true)],
    [clue(1), clue(1), clue(1), clue(1), clue(2)],
    [clue(3), clue(1), clue(1)],
    [clue(4)],
    [clue(3)],
    [clue(2), clue(1)],
    [clue(10)],
    [clue(1)],
  ],
  rows: [
    [clue(2), clue(1), clue(1), clue(1)],
    [clue(2), clue(2), clue(1)],
    [clue(2), clue(3), clue(1)],
    [clue(2), clue(2), clue(1)],
    [clue(1), clue(1), clue(1)],
    [clue(1), clue(1), clue(1)],
    [clue(1), clue(1), clue(4)],
    [clue(3)],
    [clue(2), clue(2), clue(1), clue(1)],
    [clue(2), clue(1), clue(2)],
  ],
}

const code = 'jeageacaddddeafddagafaedamadbedddaeedaefdaeedadddadddaddgafaeeddaede'

describe('puzzleEncoder', () => {
  describe('encodePuzzle', () => {
    test('encodes a puzzle', () => {
      expect(encodePuzzle(puzzle)).toEqual(code)
    })
  })

  describe('decodePuzzle', () => {
    test('decodes a code', () => {
      expect(decodePuzzle(code)).toEqual(puzzle)
    })

    test('throws an error if wrong code', () => {
      expect(() => decodePuzzle(code.slice(3))).toThrow('Wrong puzzle code')
    })
  })
})
