export enum CellState {
  Empty,
  Cross,
  Filled,
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
