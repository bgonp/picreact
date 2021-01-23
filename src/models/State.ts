export enum CellState {
  Empty,
  Cross,
  Filled,
}

export type BoardState = {
  cells: CellState[][]
  columns: number[][]
  rows: number[][]
}
