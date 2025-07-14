import { FC, useCallback, useEffect } from 'react'
import { useLocation, useParams } from 'wouter'

import { ROUTES } from 'constants/router.constants'
import { useModalContext } from 'contexts/ModalContext'
import { usePuzzleContext } from 'contexts/PuzzleContext'
import { createPuzzleFromCode } from 'utils/puzzleCreator'

const LoadPage: FC = () => {
  const { code } = useParams<{ code: string }>()
  const { initialized, solved, setPuzzle } = usePuzzleContext()
  const { showConfirm, showError, showNotice } = useModalContext()

  const [, navigate] = useLocation()

  const loadPuzzle = useCallback(() => {
    try {
      const puzzle = createPuzzleFromCode(code ?? '')
      setPuzzle(puzzle)
      navigate(ROUTES.PLAY)
      showNotice({ content: 'Puzzle loaded successfully' })
    } catch {
      navigate(ROUTES.HOME)
      showError({ content: 'Error while trying to load puzzle' })
    }
  }, [code, navigate, setPuzzle, showError, showNotice])

  const discardPuzzle = useCallback(() => navigate(ROUTES.PLAY), [navigate])

  useEffect(() => {
    if (!initialized || solved) {
      loadPuzzle()
    } else {
      showConfirm({
        content: 'This will discard current puzzle. Are you sure?',
        onConfirm: loadPuzzle,
        onClose: discardPuzzle,
      })
    }
  }, [initialized, solved, showConfirm, discardPuzzle, loadPuzzle])

  return null
}

export default LoadPage
