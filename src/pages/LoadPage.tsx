import { FC, useCallback, useEffect } from 'react'
import { useLocation } from 'wouter'

import { ROUTES } from 'constants/router.constants'
import { ModalContext } from 'contexts/ModalContext'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { useContextSecure as useContext } from 'utils/contextSecure'
import { createPuzzleFromCode } from 'utils/puzzleCreator'

type Props = {
  code: string
}

const LoadPage: FC<Props> = ({ code }) => {
  const { initialized, solved, setPuzzle } = useContext(PuzzleContext)
  const { confirm, error, notice } = useContext(ModalContext)

  const [, navigate] = useLocation()

  const loadPuzzle = useCallback<() => void>(() => {
    try {
      const puzzle = createPuzzleFromCode(code)
      setPuzzle(puzzle)
      navigate(ROUTES.PLAY)
      notice('Puzzle loaded successfully')
    } catch (e) {
      navigate(ROUTES.HOME)
      error('Error while trying to load puzzle')
    }
  }, [code, navigate, setPuzzle, error, notice])

  const discardPuzzle = useCallback<() => void>(() => navigate(ROUTES.PLAY), [navigate])

  useEffect(() => {
    if (!initialized || solved) {
      loadPuzzle()
    } else {
      confirm(
        'This will discard current puzzle. Are you sure?',
        loadPuzzle,
        discardPuzzle
      )
    }
  }, [initialized, solved, confirm, discardPuzzle, loadPuzzle])

  return null
}

export default LoadPage
