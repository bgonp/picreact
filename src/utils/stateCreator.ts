import { PuzzleType } from 'models/Puzzle'
import { BoardState, CellState } from 'models/State'

export const createState = (puzzle: PuzzleType): BoardState =>
  [...Array(puzzle.size).keys()].reduce(
    ({ cells, columns, rows }: BoardState) => ({
      cells: [...cells, Array(puzzle.size).fill(CellState.Empty)],
      columns: [...columns, []],
      rows: [...rows, []],
    }),
    { cells: [], columns: [], rows: [] }
  )
