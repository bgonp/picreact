import { PUZZLE_MIN_SIZE, PUZZLE_MAX_SIZE } from 'constants/puzzle.constants'

export interface PuzzleType {
  readonly size: number
  isFilled: (column: number, row: number) => boolean
  getColumnHelp: (column: number) => Array<number>
  getRowHelp: (row: number) => Array<number>
}

export class Puzzle implements PuzzleType {
  readonly size: number = 0
  private _cells: Array<Array<boolean>> = []
  private _columnsHelp: Array<Array<number>> = []
  private _rowsHelp: Array<Array<number>> = []

  constructor(cells: Array<Array<boolean>>) {
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

  getColumnHelp(index: number): Array<number> {
    this.validateIndex(index)
    return [...this._columnsHelp[index]]
  }

  getRowHelp(index: number): Array<number> {
    this.validateIndex(index)
    return [...this._rowsHelp[index]]
  }

  isFilled(column: number, row: number): boolean {
    this.validateIndex(column)
    this.validateIndex(row)
    return this._cells[column][row]
  }

  private initCells(cells: Array<Array<boolean>>) {
    this._cells = []

    cells.forEach((column) => {
      if (column.length !== this.size) throw new Error()
      this._cells.push([...column])
    })
  }

  private initHelp(cells: Array<Array<boolean>>) {
    this._columnsHelp = []
    this._rowsHelp = []

    for (let i = 0; i < this.size; i++) {
      const columnGroups = []
      const rowGroups = []
      let columnCounter = 0
      let rowCounter = 0

      for (let j = 0; j <= this.size; j++) {
        if (j < this.size && cells[j][i]) {
          columnCounter++
        } else if (columnCounter > 0) {
          columnGroups.push(columnCounter)
          columnCounter = 0
        }

        if (j < this.size && cells[i][j]) {
          rowCounter++
        } else if (rowCounter > 0) {
          rowGroups.push(rowCounter)
          rowCounter = 0
        }
      }
      this._columnsHelp.push(columnGroups)
      this._rowsHelp.push(rowGroups)
    }
  }

  private validateIndex(index: number): void {
    if (index < 0 || index >= this.size) throw new Error()
  }
}
