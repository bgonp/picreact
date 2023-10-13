export enum CellState {
  Empty = 0,
  Cross = 1,
  Filled = 2,
}

export type Clue = {
  solved: boolean
  value: number
}

export type Board = CellState[][]

export type Clues = Clue[][]

export type Puzzle = {
  board: Board
  columns: Clues
  rows: Clues
}
