import { useCallback } from 'react'

import { STEPS_LIMIT } from 'constants/puzzle.constants'
import { ST_HISTORY } from 'constants/storage.constants'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { CellState } from 'models/Puzzle'

type Step = [number, number, CellState]

type UseHistoryType = {
  hasHistory: boolean
  addStep: (row: number, col: number, state: CellState) => void
  getStep: () => Step | null
  cleanSteps: () => void
}

export const useHistory = (): UseHistoryType => {
  const [history, setHistory, cleanHistory] = useLocalStorage(ST_HISTORY, [] as Step[])

  const hasHistory = history.length > 0

  const addStep = useCallback(
    (row: number, col: number, state: CellState) => {
      const newStep = [row, col, state] as Step
      setHistory((steps) => [newStep, ...steps].slice(0, STEPS_LIMIT))
    },
    [setHistory]
  )

  const getStep = useCallback(() => {
    if (!hasHistory) return null
    const [step, ...nextHistory] = history
    setHistory(nextHistory)
    return step
  }, [hasHistory, history, setHistory])

  const cleanSteps = useCallback(() => {
    cleanHistory()
    setHistory([])
  }, [cleanHistory, setHistory])

  return { hasHistory, addStep, getStep, cleanSteps }
}
