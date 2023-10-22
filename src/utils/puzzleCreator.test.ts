import { CellState } from 'models/Puzzle'
import { describe, expect, test } from 'vitest'
import {
  createPuzzleFromCells,
  createPuzzleFromCode,
  createPuzzleFromSize,
  getClues,
  getEmptyBoard,
} from './puzzleCreator'

const getCells = (): CellState[][] => [
  [2, 2, 0, 2, 0, 2, 0, 0, 2, 0],
  [2, 2, 0, 0, 2, 2, 0, 0, 2, 0],
  [2, 2, 0, 2, 2, 2, 0, 0, 2, 0],
  [2, 2, 0, 0, 2, 2, 0, 0, 2, 0],
  [2, 0, 0, 2, 0, 0, 0, 0, 2, 0],
  [2, 0, 0, 0, 2, 0, 0, 0, 2, 0],
  [2, 0, 0, 2, 0, 0, 2, 2, 2, 2],
  [0, 0, 0, 0, 0, 0, 2, 2, 2, 0],
  [2, 2, 0, 2, 2, 0, 2, 0, 2, 0],
  [2, 2, 0, 2, 0, 0, 0, 2, 2, 0],
]

const clue = (value: number, solved = false) => ({ value, solved })

describe('puzzleCreator', () => {
  describe('getClues', () => {
    test('generates right clues', () => {
      const { columns, rows } = getClues(getCells())

      expect(columns).toEqual([
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
      ])

      expect(rows).toEqual([
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
      ])
    })
  })

  describe('getEmptyBoard', () => {
    test('generates empty board', () => {
      const board = getEmptyBoard(10)

      expect(board).toEqual([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ])
    })
  })

  describe('createPuzzleFromCells', () => {
    test('generates puzzle from cells', () => {
      const puzzle = createPuzzleFromCells(getCells())

      expect(puzzle).toEqual({
        board: getEmptyBoard(10),
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
      })
    })

    test('throws error if wrong size if no cells', () => {
      expect(() => createPuzzleFromCells([[]])).toThrow('Wrong puzzle size')
    })

    test('throws error if wrong size', () => {
      const cells = [...getCells(), [2, 0, 0, 2, 0, 0, 0, 0, 2, 0]]
      expect(() => createPuzzleFromCells(cells)).toThrow('Wrong puzzle size')
    })

    test('throws error if cells not square', () => {
      const cells = [...getCells(), ...getCells()]
      expect(() => createPuzzleFromCells(cells)).toThrow('Wrong puzzle size')
    })
  })

  describe('createPuzzleFromSize', () => {
    test.each([[5], [10], [15], [20]])('creates a puzzle from size', (size) => {
      const puzzle = createPuzzleFromSize(size)

      expect(puzzle.columns).toHaveLength(size)
      expect(puzzle.rows).toHaveLength(size)
      expect(puzzle.board).toHaveLength(size)
      expect(puzzle.board.every((row) => row.length === size)).toBe(true)
    })

    test('throws error if wrong size', () => {
      expect(() => createPuzzleFromSize(13)).toThrow('Wrong puzzle size')
    })
  })

  describe('createPuzzleFromCode', () => {
    test('creates a puzzle from code', () => {
      const code = 'jeageacaddddeafddagafaedamadbedddaeedaefdaeedadddadddaddgafaeeddaede'
      const puzzle = createPuzzleFromCode(code)

      expect(puzzle).toEqual({
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
        board: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
      })
    })
  })
})
