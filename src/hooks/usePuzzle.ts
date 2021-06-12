import { useCallback, useEffect, useMemo } from 'react'

import { ST_BOARD, ST_COLUMNS, ST_ROWS } from 'constants/storage.constants'
import { useHistory } from 'hooks/useHistory'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { CellState, Clues, Puzzle } from 'models/Puzzle'
import { getEmptyBoard } from 'utils/puzzleCreator'
import { getUpdatedClues } from 'utils/getUpdatedClues'

type Board = Puzzle['board']
type Columns = Puzzle['columns']
type Rows = Puzzle['rows']

export type UsePuzzleType = {
  canUndo: boolean
  empty: boolean
  initialized: boolean
  puzzle: Puzzle
  size: number
  solved: boolean
  getCellState: (row: number, col: number) => CellState
  remove: () => void
  reset: () => void
  setCellState: (row: number, col: number) => (state: CellState) => void
  setPuzzle: (puzzle: Puzzle) => void
  undo: () => void
}

const resetClues = (clues: Clues): Clues =>
  clues.map((clue) => clue.map(({ value }) => ({ value, solved: value === 0 })))

export const usePuzzle = (): UsePuzzleType => {
  const { hasHistory, addStep, getStep, cleanSteps } = useHistory()
  const [board, setBoard, cleanBoard] = useLocalStorage(ST_BOARD, [] as Board)
  const [columns, setColumns, cleanColumns] = useLocalStorage(ST_COLUMNS, [] as Columns)
  const [rows, setRows, cleanRows] = useLocalStorage(ST_ROWS, [] as Rows)

  const size = board.length

  const initialized = size > 0

  const empty = useMemo(
    () => board.every((line) => line.every((cell) => cell === CellState.Empty)),
    [board]
  )

  const solved = useMemo(() => {
    if (!initialized) return false
    const colsSolved = columns.every((clues) => clues.every((clue) => clue.solved))
    const rowsSolved = rows.every((clues) => clues.every((clue) => clue.solved))
    return colsSolved && rowsSolved
  }, [columns, rows, initialized])

  const canUndo = !solved && hasHistory

  const checkIndexes = useCallback(
    (...indexes: number[]) => {
      if (indexes.some((index) => index < 0 && index >= size))
        throw new Error('Cell index out of bounds')
    },
    [size]
  )

  const getCellState = useCallback(
    (row: number, col: number) => {
      checkIndexes(row, col)
      return board[row][col]
    },
    [board, checkIndexes]
  )

  const remove = useCallback<() => void>(() => {
    cleanSteps()
    setBoard([])
    setColumns([])
    setRows([])
  }, [cleanSteps, setBoard, setColumns, setRows])

  const reset = useCallback<() => void>(() => {
    cleanSteps()
    setBoard((board) => getEmptyBoard(board.length))
    setColumns(resetClues)
    setRows(resetClues)
  }, [cleanSteps, setBoard, setColumns, setRows])

  const updateCell = useCallback(
    (r: number, c: number, state: CellState) => {
      checkIndexes(r, c)

      const nextBoard = board.map((column, i) =>
        column.map((cell, j) => (i === r && j === c ? state : cell))
      )
      const col = nextBoard.map((row) => row[c])
      const nextCols = columns.map((l, i) => (i !== c ? l : getUpdatedClues(l, col)))
      const row = nextBoard[r]
      const nextRows = rows.map((l, i) => (i !== r ? l : getUpdatedClues(l, row)))

      setBoard(nextBoard)
      setColumns(nextCols)
      setRows(nextRows)
    },
    [board, columns, rows, checkIndexes, setBoard, setColumns, setRows]
  )

  const setCellState = useCallback(
    (row, col) => (state: CellState) => {
      addStep(row, col, getCellState(row, col))
      updateCell(row, col, state)
    },
    [addStep, getCellState, updateCell]
  )

  const setPuzzle = useCallback(
    (puzzle: Puzzle) => {
      setBoard(puzzle.board)
      setColumns(puzzle.columns)
      setRows(puzzle.rows)
    },
    [setBoard, setColumns, setRows]
  )

  const undo = useCallback(() => {
    if (solved) return
    const lastStep = getStep()
    if (lastStep) updateCell(...lastStep)
  }, [solved, getStep, updateCell])

  useEffect(() => {
    if (!solved) return
    cleanBoard()
    cleanColumns()
    cleanSteps()
    cleanRows()
  }, [solved, cleanBoard, cleanColumns, cleanSteps, cleanRows])

  return {
    canUndo,
    empty,
    initialized,
    puzzle: { board, columns, rows },
    size,
    solved,
    getCellState,
    remove,
    reset,
    setCellState,
    setPuzzle,
    undo,
  }
}
