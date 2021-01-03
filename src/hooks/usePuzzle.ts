import { useCallback, useEffect, useState } from 'react'

import { useLocalStorage } from 'hooks/useLocalStorage'
import { PuzzleType } from 'models/Puzzle'
import { BoardState, CellState } from 'models/State'
import { decodePuzzle, encodePuzzle } from 'utils/puzzleEncoder'
import { createState } from 'utils/stateCreator'

import { STORAGE_CODE, STORAGE_STATE } from 'constants/storage.constants'

export type usePuzzleType = {
  code: string
  finished: boolean
  puzzle: PuzzleType | null
  getState: (c: number, r: number) => CellState
  resetState: () => void
  setFinished: () => void
  setPuzzle: (puzzle: PuzzleType) => void
  setState: (c: number, r: number, value: CellState) => void
}

export const initialPuzzleState = {
  code: '',
  finished: false,
  puzzle: null,
  getState: () => CellState.Empty,
  resetState: () => {},
  setFinished: () => {},
  setPuzzle: () => {},
  setState: () => {},
}

export const usePuzzle = (): usePuzzleType => {
  const [code, setCodeValue, cleanCodeStorage] = useLocalStorage<string>(
    STORAGE_CODE,
    initialPuzzleState.code
  )

  const [state, setStateValue, cleanStateStorage] = useLocalStorage<BoardState>(
    STORAGE_STATE,
    []
  )

  const [finished, setFinishedValue] = useState<boolean>(initialPuzzleState.finished)

  const [puzzle, setPuzzleValue] = useState<PuzzleType | null>(initialPuzzleState.puzzle)

  const getState = useCallback<(c: number, r: number) => CellState>(
    (c, r) => {
      if (state.length === 0) return CellState.Empty
      return state[c][r]
    },
    [state]
  )

  const resetState = useCallback<() => void>(() => {
    if (puzzle && !finished) setStateValue(createState(puzzle))
  }, [puzzle, finished])

  const setState = useCallback<(c: number, r: number, value: CellState) => void>(
    (c, r, value) => {
      setStateValue(
        state.map((row, i) => {
          if (i !== c) return [...row]
          return row.map((cell, j) => (j !== r ? cell : value))
        })
      )
    },
    [state]
  )

  const setPuzzle = useCallback<(puzzle: PuzzleType) => void>((puzzle) => {
    setFinishedValue(false)
    setPuzzleValue(puzzle)
    setCodeValue(encodePuzzle(puzzle))
    setStateValue(createState(puzzle))
  }, [])

  const setFinished = useCallback<() => void>(() => {
    setFinishedValue(true)
    cleanCodeStorage()
    cleanStateStorage()
  }, [])

  useEffect(() => {
    if (!code) return
    let puzzle
    if (finished || (puzzle = decodePuzzle(code)).size !== state.length) {
      cleanCodeStorage()
      cleanStateStorage()
    } else {
      setPuzzleValue(puzzle)
    }
  }, [])

  return {
    code,
    finished,
    puzzle,
    getState,
    resetState,
    setFinished,
    setPuzzle,
    setState,
  }
}
