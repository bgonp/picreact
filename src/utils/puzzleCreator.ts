import { MIN_SIZE, MAX_SIZE } from 'constants/puzzle.constants'
import { CellState, Clue, Puzzle } from 'models/Puzzle'
import { decodePuzzle } from 'utils/puzzleEncoder'

const isValidSize = (size: number): boolean =>
  size >= MIN_SIZE && size <= MAX_SIZE && size % 5 === 0

const getLineClues = (type: 'col' | 'row', cells: CellState[][], i: number): Clue[] => {
  let counter = 0

  const clues = [...Array(cells.length + 1)].reduce((acc, _, j) => {
    if (j < cells.length && (type === 'col' ? cells[j]?.[i] : cells[i]?.[j])) {
      counter++
    } else if (counter > 0) {
      acc.push({ value: counter, solved: false })
      counter = 0
    }
    return acc
  }, [] as Clue[])

  return clues.length === 0 ? [{ value: 0, solved: true }] : clues
}

export const getClues = (cells: CellState[][]): { columns: Clue[][]; rows: Clue[][] } =>
  [...Array(cells.length)].reduce(
    ({ columns, rows }, _, i) => ({
      columns: [...columns, getLineClues('col', cells, i)],
      rows: [...rows, getLineClues('row', cells, i)],
    }),
    { columns: [], rows: [] }
  )

export const getEmptyBoard = (size: number): CellState[][] =>
  [...Array(size)].reduce(
    (acc) => [...acc, Array(size).fill(CellState.Empty)],
    [] as CellState[][]
  )

export const createPuzzleFromCells = (cells: CellState[][]): Puzzle => {
  const size = cells.length
  if (!isValidSize(size) || cells.some((row) => size !== row.length))
    throw new Error('Wrong puzzle size')

  const board = getEmptyBoard(size)
  const { columns, rows } = getClues(cells)

  return { board, columns, rows }
}

export const createPuzzleFromSize = (size: number): Puzzle => {
  const cells = [...Array(size)].map(() =>
    [...Array(size)].map(() => (Math.random() < 0.6 ? CellState.Filled : CellState.Empty))
  )

  return createPuzzleFromCells(cells)
}

export const createPuzzleFromCode = (code: string): Puzzle => {
  const { columns, rows } = decodePuzzle(code)
  const size = columns?.length ?? 0
  if (!isValidSize(size)) throw new Error('Wrong puzzle size')

  const board = getEmptyBoard(columns.length ?? 0)

  return { board, columns, rows }
}
