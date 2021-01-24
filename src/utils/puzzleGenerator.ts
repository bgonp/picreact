import { PUZZLE_MIN_SIZE, PUZZLE_MAX_SIZE } from 'constants/puzzle.constants'
import { Puzzle, PuzzleType } from 'models/Puzzle'

export const createPuzzle = (size: number): PuzzleType => {
  if (size < PUZZLE_MIN_SIZE || size > PUZZLE_MAX_SIZE || size % 5 !== 0)
    throw new Error()

  const indexes = [...Array(size).keys()]
  const cells: boolean[][] = indexes.map(() => indexes.map(() => Math.random() < 0.6))

  return new Puzzle(cells)
}
