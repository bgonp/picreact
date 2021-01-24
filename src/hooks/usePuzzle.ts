import { useCallback, useEffect, useState } from 'react'

import { useLocalStorage } from 'hooks/useLocalStorage'
import { PuzzleType } from 'models/Puzzle'
import { BoardState, CellState } from 'models/State'
import { decodePuzzle, encodePuzzle } from 'utils/puzzleEncoder'
import { createState } from 'utils/stateCreator'

import { STORAGE_CODE, STORAGE_STATE } from 'constants/storage.constants'
import { getColState, getRowState } from 'utils/linesState'

export type usePuzzleType = {
  code: string
  colsState: number[][]
  finished: boolean
  puzzle: PuzzleType | null
  rowsState: number[][]
  getCellState: (c: number, r: number) => CellState
  resetState: () => void
  setFinished: () => void
  setPuzzle: (puzzle: PuzzleType) => void
  setCellState: (c: number, r: number) => (value: CellState) => void
}

export const initialPuzzleState: usePuzzleType = {
  code: '',
  colsState: [],
  finished: false,
  puzzle: null,
  rowsState: [],
  getCellState: () => CellState.Empty,
  resetState: () => {},
  setFinished: () => {},
  setPuzzle: () => {},
  setCellState: () => () => {},
}

export const usePuzzle = (): usePuzzleType => {
  const [code, setCodeValue, cleanCodeStorage] = useLocalStorage<string>(
    STORAGE_CODE,
    initialPuzzleState.code
  )

  const [state, setStateValue, cleanStateStorage] = useLocalStorage<BoardState>(
    STORAGE_STATE,
    { cells: [], columns: [], rows: [] }
  )

  const [finished, setFinishedValue] = useState<boolean>(initialPuzzleState.finished)

  const [puzzle, setPuzzleValue] = useState<PuzzleType | null>(initialPuzzleState.puzzle)

  const getCellState = useCallback<(c: number, r: number) => CellState>(
    (c, r) => {
      if (state.cells.length === 0) return CellState.Empty
      return state.cells[c][r]
    },
    [state.cells]
  )

  const resetState = useCallback<() => void>(() => {
    if (puzzle && !finished) setStateValue(createState(puzzle))
  }, [puzzle, finished, setStateValue])

  const setCellState = useCallback<(c: number, r: number) => (value: CellState) => void>(
    (c, r) => (value) => {
      const cells = state.cells.map((row, i) => {
        if (i !== c) return [...row]
        return row.map((cell, j) => (j !== r ? cell : value))
      })
      const columns = state.columns.map((column, i) => {
        if (i !== r) return [...column]
        return getColState(cells, i)
      })
      const rows = state.rows.map((row, i) => {
        if (i !== c) return [...row]
        return getRowState(cells, i)
      })
      setStateValue({ cells, columns, rows })
    },
    [state, setStateValue]
  )

  const setPuzzle = useCallback<(puzzle: PuzzleType) => void>(
    (puzzle) => {
      setFinishedValue(false)
      setPuzzleValue(puzzle)
      setCodeValue(encodePuzzle(puzzle))
      setStateValue(createState(puzzle))
    },
    [setCodeValue, setStateValue]
  )

  const setFinished = useCallback<() => void>(() => {
    setFinishedValue(true)
    cleanCodeStorage()
    cleanStateStorage()
  }, [cleanCodeStorage, cleanStateStorage])

  useEffect(() => {
    if (!code || puzzle) return
    const newPuzzle = puzzle || decodePuzzle(code)
    if (finished || newPuzzle.size !== state.cells.length) {
      cleanCodeStorage()
      cleanStateStorage()
    } else {
      setPuzzleValue(newPuzzle)
    }
  }, [code, finished, state, puzzle, cleanCodeStorage, cleanStateStorage])

  return {
    code,
    colsState: state.columns,
    finished,
    puzzle,
    rowsState: state.rows,
    getCellState,
    resetState,
    setFinished,
    setPuzzle,
    setCellState,
  }
}
