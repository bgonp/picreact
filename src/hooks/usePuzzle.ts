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
  setFinished: (finished: boolean) => void
  setPuzzle: (puzzle: PuzzleType) => void
  setState: (c: number, r: number, value: CellState) => void
}

export const initialPuzzleState = {
  code: '',
  finished: false,
  puzzle: null,
  getState: () => CellState.Empty,
  setFinished: () => {},
  setPuzzle: () => {},
  setState: () => {},
}

export const usePuzzle = (): usePuzzleType => {
  const [code, setCode] = useLocalStorage<string>(STORAGE_CODE, initialPuzzleState.code)

  const [finished, setFinished] = useState<boolean>(initialPuzzleState.finished)

  const [state, setStateValue] = useLocalStorage<BoardState>(STORAGE_STATE, [])

  const [puzzle, setPuzzleValue] = useState<PuzzleType | null>(initialPuzzleState.puzzle)

  const getState = useCallback<(c: number, r: number) => CellState>(
    (c, r) => {
      if (state.length === 0) return CellState.Empty
      return state[c][r]
    },
    [state]
  )

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
    setFinished(false)
    setPuzzleValue(puzzle)
    setCode(encodePuzzle(puzzle))
    setStateValue(createState(puzzle))
  }, [])

  useEffect(() => {
    if (code) setPuzzleValue(decodePuzzle(code))
  }, [])

  return {
    code,
    finished,
    puzzle,
    getState,
    setFinished,
    setPuzzle,
    setState,
  }
}
