import { useCallback, useState } from 'react'
import { useLocalStorage } from 'bgon-custom-hooks'

import { ST_BOARD, ST_COLUMNS, ST_ROWS } from 'constants/storage.constants'
import { CellState, Puzzle } from 'models/Puzzle'
import { getEmptyBoard } from 'utils/puzzleCreator'
import { getUpdatedClues } from 'utils/getUpdatedClues'

type Board = Puzzle['board']
type Columns = Puzzle['columns']
type Rows = Puzzle['rows']

export type UsePuzzleType = {
  finished: boolean
  puzzle: Puzzle
  getCellState: (c: number, r: number) => CellState
  reset: () => void
  setCellState: (c: number, r: number) => (value: CellState) => void
  setFinished: () => void
  setPuzzle: (puzzle: Puzzle) => void
}

export const usePuzzle = (): UsePuzzleType => {
  const [board, setBoard, cleanBoard] = useLocalStorage<Board>(ST_BOARD, [])
  const [columns, setColumns, cleanColumns] = useLocalStorage<Columns>(ST_COLUMNS, [])
  const [rows, setRows, cleanRows] = useLocalStorage<Rows>(ST_ROWS, [])

  const [finished, setFinishedValue] = useState<boolean>(false)

  const isValidIndex = useCallback<(index: number) => boolean>(
    (index) => index >= 0 && index < board.length,
    [board]
  )

  const getCellState = useCallback<(c: number, r: number) => CellState>(
    (c, r) => {
      if (!isValidIndex(c) || !isValidIndex(r))
        throw new Error('Cell index out of bounds')
      return board[c][r]
    },
    [board, isValidIndex]
  )

  const reset = useCallback<() => void>(() => {
    setBoard((board) => getEmptyBoard(board.length))
    setColumns((columns) =>
      columns.map((column) => column.map(({ value }) => ({ value, solved: false })))
    )
    setRows((rows) =>
      rows.map((row) => row.map(({ value }) => ({ value, solved: false })))
    )
  }, [setBoard, setColumns, setRows])

  const setCellState = useCallback<(c: number, r: number) => (value: CellState) => void>(
    (c, r) => (value) => {
      if (!isValidIndex(c) || !isValidIndex(r))
        throw new Error('Cell index out of bounds')

      const nextBoard = board.map((column, i) =>
        column.map((cell, j) => (i === c && j === r ? value : cell))
      )

      setBoard(nextBoard)
      setColumns((cols) => {
        const line = nextBoard[c]
        return cols.map((col, i) => (i !== c ? col : getUpdatedClues(col, line)))
      })
      setRows((rows) => {
        const line = nextBoard.map((column) => column[r])
        return rows.map((row, i) => (i !== r ? row : getUpdatedClues(row, line)))
      })
    },
    [board, isValidIndex, setBoard, setColumns, setRows]
  )

  const setFinished = useCallback<() => void>(() => {
    setFinishedValue(true)
    cleanBoard()
    cleanColumns()
    cleanRows()
  }, [cleanBoard, cleanColumns, cleanRows])

  const setPuzzle = useCallback<(puzzle: Puzzle) => void>(
    (puzzle) => {
      setFinishedValue(false)
      setBoard(puzzle.board)
      setColumns(puzzle.columns)
      setRows(puzzle.rows)
    },
    [setBoard, setColumns, setRows]
  )

  return {
    finished,
    puzzle: { board, columns, rows },
    getCellState,
    reset,
    setCellState,
    setFinished,
    setPuzzle,
  }
}
