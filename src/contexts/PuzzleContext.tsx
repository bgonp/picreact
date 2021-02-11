import { FC } from 'react'
import { usePuzzle, UsePuzzleType } from 'hooks/usePuzzle'
import { createContextSecure as createContext } from 'utils/contextSecure'

export const PuzzleContext = createContext<UsePuzzleType>()

export const PuzzleContextProvider: FC = ({ children }) => {
  const puzzleContext = usePuzzle()

  return <PuzzleContext.Provider value={puzzleContext}>{children}</PuzzleContext.Provider>
}
