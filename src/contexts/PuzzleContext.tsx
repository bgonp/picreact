import { createContext, FC, useContext, useEffect } from 'react'

import { useModalContext } from 'contexts/ModalContext'
import { usePuzzle, UsePuzzleType } from 'hooks/usePuzzle'

const PuzzleContext = createContext<UsePuzzleType | null>(null)

export const usePuzzleContext = (): UsePuzzleType => {
  const puzzleContext = useContext(PuzzleContext)
  if (puzzleContext === null) throw Error('Unable to use puzzle outside context')

  return puzzleContext
}

export const PuzzleContextProvider: FC = ({ children }) => {
  const puzzleContext = usePuzzle()
  const { showNotice } = useModalContext()

  useEffect(() => {
    if (puzzleContext.solved) showNotice({ content: 'Puzzle solved! Congratulations!' })
  }, [puzzleContext.solved, showNotice])

  return <PuzzleContext.Provider value={puzzleContext}>{children}</PuzzleContext.Provider>
}
