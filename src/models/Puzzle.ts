import { getLinesState } from 'utils/linesState'

import { PUZZLE_MIN_SIZE, PUZZLE_MAX_SIZE } from 'constants/puzzle.constants'

export interface PuzzleType {
  readonly size: number
  isFilled: (column: number, row: number) => boolean
  getColumnHelp: (column: number) => number[]
  getRowHelp: (row: number) => number[]
  map: <T>(callback: (column: number, row: number, filled: boolean) => T) => T[]
}

export class Puzzle implements PuzzleType {
  readonly size: number = 0
  private _cells: boolean[][] = []
  private _columnsHelp: number[][] = []
  private _rowsHelp: number[][] = []

  constructor(cells: boolean[][]) {
    if (
      cells.length < PUZZLE_MIN_SIZE ||
      cells.length > PUZZLE_MAX_SIZE ||
      cells.length % 5 !== 0
    )
      throw new Error()

    this.size = cells.length
    this.initCells(cells)
    this.initHelp(cells)
  }

  getColumnHelp(index: number): number[] {
    this.validateIndex(index)

    return [...this._columnsHelp[index]]
  }

  getRowHelp(index: number): number[] {
    this.validateIndex(index)

    return [...this._rowsHelp[index]]
  }

  isFilled(column: number, row: number): boolean {
    this.validateIndex(column)
    this.validateIndex(row)

    return this._cells[column][row]
  }

  map<T>(callback: (column: number, row: number, filled: boolean) => T): T[] {
    const result = []
    const indexes = [...Array(this.size).keys()]

    for (const c of indexes) {
      for (const r of indexes) {
        result.push(callback(c, r, this._cells[c][r]))
      }
    }

    return result
  }

  private initCells(cells: boolean[][]) {
    this._cells = []

    cells.forEach((column) => {
      if (column.length !== this.size) throw new Error()
      this._cells.push([...column])
    })
  }

  private initHelp(cells: boolean[][]) {
    const { columns, rows } = getLinesState(cells)

    this._columnsHelp = columns
    this._rowsHelp = rows
  }

  private validateIndex(index: number): void {
    if (index < 0 || index >= this.size) throw new Error()
  }
}
