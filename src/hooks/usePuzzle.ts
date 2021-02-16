import { useCallback, useEffect } from 'react'
import { useLocalStorage } from 'bgon-custom-hooks'

import { ST_BOARD, ST_COLUMNS, ST_HISTORY, ST_ROWS } from 'constants/storage.constants'
import { STEPS_LIMIT } from 'constants/puzzle.constants'
import { CellState, Puzzle } from 'models/Puzzle'
import { getEmptyBoard } from 'utils/puzzleCreator'
import { getUpdatedClues } from 'utils/getUpdatedClues'

type Board = Puzzle['board']
type Columns = Puzzle['columns']
type Rows = Puzzle['rows']

type Step = [number, number, CellState]

export type UsePuzzleType = {
  canUndo: boolean
  empty: boolean
  initialized: boolean
  puzzle: Puzzle
  size: number
  solved: boolean
  getCellState: (r: number, c: number) => CellState
  remove: () => void
  reset: () => void
  setCellState: (r: number, c: number) => (state: CellState) => void
  setPuzzle: (puzzle: Puzzle) => void
  undo: () => void
}

export const usePuzzle = (): UsePuzzleType => {
  const [board, setBoard, cleanBoard] = useLocalStorage<Board>(ST_BOARD, [])
  const [columns, setColumns, cleanColumns] = useLocalStorage<Columns>(ST_COLUMNS, [])
  const [rows, setRows, cleanRows] = useLocalStorage<Rows>(ST_ROWS, [])
  const [history, setHistory, cleanHistory] = useLocalStorage<Step[]>(ST_HISTORY, [])

  const size = board.length
  const initialized = size > 0
  const empty = board.every((line) => line.every((cell) => cell !== CellState.Filled))
  const colsSolved = columns.every((clues) => clues.every((clue) => clue.solved))
  const rowsSolved = columns.every((clues) => clues.every((clue) => clue.solved))
  const solved = initialized && colsSolved && rowsSolved
  const canUndo = history.length > 0 && !solved

  const checkIndexes = useCallback<(...indexes: number[]) => void>(
    (...indexes) => {
      if (indexes.some((index) => index < 0 && index >= board.length))
        throw new Error('Cell index out of bounds')
    },
    [board]
  )

  const getCellState = useCallback<(r: number, c: number) => CellState>(
    (r, c) => {
      checkIndexes(r, c)
      return board[r][c]
    },
    [board, checkIndexes]
  )

  const remove = useCallback<() => void>(() => {
    setHistory([])
    setBoard([])
    setColumns([])
    setRows([])
  }, [setBoard, setColumns, setHistory, setRows])

  const reset = useCallback<() => void>(() => {
    setHistory([])
    setBoard((board) => getEmptyBoard(board.length))
    setColumns((columns) =>
      columns.map((column) => column.map(({ value }) => ({ value, solved: false })))
    )
    setRows((rows) =>
      rows.map((row) => row.map(({ value }) => ({ value, solved: false })))
    )
  }, [setBoard, setColumns, setHistory, setRows])

  const updateCell = useCallback<(r: number, c: number, state: CellState) => void>(
    (r, c, state) => {
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

  const setCellState = useCallback<(r: number, c: number) => (state: CellState) => void>(
    (r, c) => (state) => {
      const prevState = getCellState(r, c)
      setHistory((steps) => [[r, c, prevState], ...steps].slice(0, STEPS_LIMIT) as Step[])
      updateCell(r, c, state)
    },
    [getCellState, setHistory, updateCell]
  )

  const setPuzzle = useCallback<(puzzle: Puzzle) => void>(
    (puzzle) => {
      setBoard(puzzle.board)
      setColumns(puzzle.columns)
      setRows(puzzle.rows)
    },
    [setBoard, setColumns, setRows]
  )

  const undo = useCallback<() => void>(() => {
    if (!canUndo) return
    const [[r, c, state], ...nextHistory] = history
    updateCell(r, c, state)
    setHistory(nextHistory)
  }, [canUndo, history, setHistory, updateCell])

  useEffect(() => {
    if (!solved) return
    cleanBoard()
    cleanColumns()
    cleanHistory()
    cleanRows()
  }, [solved, cleanBoard, cleanColumns, cleanHistory, cleanRows])

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
