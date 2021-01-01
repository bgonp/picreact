export enum CellState {
  Empty,
  Cross,
  Filled,
}

export type BoardState = Array<Array<CellState>>
