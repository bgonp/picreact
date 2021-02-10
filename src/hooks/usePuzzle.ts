import { useCallback, useState } from 'react'
import { useLocalStorage } from 'bgon-custom-hooks'

import { STORAGE_CODE, STORAGE_STATE } from 'constants/storage.constants'
import { PuzzleType } from 'models/Puzzle'
import { BoardState, CellState } from 'models/State'
import { decodePuzzle, encodePuzzle } from 'utils/puzzleEncoder'
import { createState } from 'utils/stateCreator'
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

export const usePuzzle = (): usePuzzleType => {
  const [code, setCodeValue, cleanCodeStorage] = useLocalStorage<string>(STORAGE_CODE, '')

  const [state, setStateValue, cleanStateStorage] = useLocalStorage<BoardState>(
    STORAGE_STATE,
    { cells: [], columns: [], rows: [] }
  )

  const [finished, setFinishedValue] = useState<boolean>(false)

  const [puzzle, setPuzzleValue] = useState<PuzzleType | null>(() =>
    code ? decodePuzzle(code) : null
  )

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
      const cells = state.cells.map((row: CellState[], i: number) => {
        if (i !== c) return [...row]
        return row.map((cell, j) => (j !== r ? cell : value))
      })
      const columns = state.columns.map((column: number[], i: number) => {
        if (i !== r) return [...column]
        return getColState(cells, i)
      })
      const rows = state.rows.map((row: number[], i: number) => {
        if (i !== c) return [...row]
        return getRowState(cells, i)
      })
      setStateValue({ cells, columns, rows })
    },
    [state, setStateValue]
  )

  const setFinished = useCallback<() => void>(() => {
    setFinishedValue(true)
    cleanCodeStorage()
    cleanStateStorage()
  }, [cleanCodeStorage, cleanStateStorage])

  const setPuzzle = useCallback<(puzzle: PuzzleType) => void>(
    (puzzle) => {
      setFinishedValue(false)
      setPuzzleValue(puzzle)
      setCodeValue(encodePuzzle(puzzle))
      setStateValue(createState(puzzle))
    },
    [setCodeValue, setStateValue]
  )

  return {
    code,
    colsState: state.columns,
    finished,
    puzzle,
    rowsState: state.rows,
    getCellState,
    resetState,
    setCellState,
    setFinished,
    setPuzzle,
  }
}
