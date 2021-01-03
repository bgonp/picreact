import { createContext, FC, ReactElement } from 'react'
import { initialPuzzleState, usePuzzle, usePuzzleType } from 'hooks/usePuzzle'

type Props = {
  children: ReactElement
}

export const PuzzleContext = createContext<usePuzzleType>(initialPuzzleState)

export const PuzzleContextProvider: FC<Props> = ({ children }) => {
  const puzzleContext = usePuzzle()

  return <PuzzleContext.Provider value={puzzleContext}>{children}</PuzzleContext.Provider>
}
