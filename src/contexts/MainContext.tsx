import { createContext, FC, ReactElement } from 'react'
import { initialPuzzleState, usePuzzle, usePuzzleType } from 'hooks/usePuzzle'

type Props = {
  children: ReactElement
}

export const MainContext = createContext<usePuzzleType>(initialPuzzleState)

export const MainContextProvider: FC<Props> = ({ children }) => {
  const puzzleContext: usePuzzleType = usePuzzle()

  return <MainContext.Provider value={puzzleContext}>{children}</MainContext.Provider>
}
