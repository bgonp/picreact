import { PuzzleType } from 'models/Puzzle'
import { BoardState, CellState } from 'models/State'

export const createState = (puzzle: PuzzleType): BoardState => {
  const state = []
  for (let i = 0; i < puzzle.size; i++) {
    state.push(new Array(puzzle.size).fill(CellState.Empty))
  }
  return state
}
