import { CellState } from 'models/State'

type LinesState = {
  columns: number[][]
  rows: number[][]
}

const isFilled = (cell: boolean | CellState) => cell === true || cell === CellState.Filled

const getLineState = (
  type: 'col' | 'row',
  cells: boolean[][] | CellState[][],
  i: number
): number[] => {
  let counter = 0

  return [...Array(cells.length + 1).keys()].reduce((acc: number[], j) => {
    if (j < cells.length && isFilled(type === 'col' ? cells[j][i] : cells[i][j])) {
      counter++
    } else if (counter > 0) {
      acc.push(counter)
      counter = 0
    }
    return acc
  }, [])
}

export const getLinesState = (cells: boolean[][]): LinesState => {
  const result: LinesState = { columns: [], rows: [] }
  for (const i of [...Array(cells.length).keys()]) {
    result.columns.push(getColState(cells, i))
    result.rows.push(getRowState(cells, i))
  }
  return result
}

// TODO: Remove?
export const getColState = (cells: boolean[][] | CellState[][], i: number): number[] =>
  getLineState('col', cells, i)

// TODO: Remove?
export const getRowState = (cells: boolean[][] | CellState[][], i: number): number[] =>
  getLineState('row', cells, i)
