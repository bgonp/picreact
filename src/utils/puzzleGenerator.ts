import { PUZZLE_MIN_SIZE, PUZZLE_MAX_SIZE } from 'constants/puzzle.constants'
import { Puzzle, PuzzleType } from 'models/Puzzle'

export const createPuzzle = (size: number): PuzzleType => {
  if (size < PUZZLE_MIN_SIZE || size > PUZZLE_MAX_SIZE || size % 5 !== 0)
    throw new Error()

  const cells: Array<Array<boolean>> = []
  for (let i = 0; i < size; i++) {
    cells.push([])
    for (let j = 0; j < size; j++) {
      cells[i].push(Math.random() < 0.65)
    }
  }

  return new Puzzle(cells)
}
