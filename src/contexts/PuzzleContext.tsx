import { FC, useEffect } from 'react'
import { usePuzzle, UsePuzzleType } from 'hooks/usePuzzle'
import {
  createContextSecure as createContext,
  useContextSecure as useContext,
} from 'utils/contextSecure'
import { ModalContext } from './ModalContext'

export const PuzzleContext = createContext<UsePuzzleType>()

export const PuzzleContextProvider: FC = ({ children }) => {
  const puzzleContext = usePuzzle()
  const { notice } = useContext(ModalContext)

  useEffect(() => {
    if (puzzleContext.solved) notice('Puzzle solved! Congratulations!')
  }, [puzzleContext.solved, notice])

  return <PuzzleContext.Provider value={puzzleContext}>{children}</PuzzleContext.Provider>
}
