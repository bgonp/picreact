import { FC, lazy, useEffect } from 'react'
import { useLocation } from 'wouter'

import LazyLoaded from 'components/LazyLoaded'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { ROUTE_HOME } from 'constants/router.constants'
import { useContextSecure as useContext } from 'utils/contextSecure'
import { ModalContext } from 'contexts/ModalContext'

const Board = lazy(() => import('components/Board'))

const PlayPage: FC = () => {
  const { confirm } = useContext(ModalContext)
  const {
    canUndo,
    initialized,
    size,
    solved,
    puzzle,
    getCellState,
    reset,
    setCellState,
    undo,
  } = useContext(PuzzleContext)

  const [, navigate] = useLocation()

  const handleReset = () =>
    confirm('This will discard current progress. Are you sure?', reset)

  useEffect(() => {
    if (!initialized) navigate(ROUTE_HOME)
  }, [initialized, navigate])

  return (
    <LazyLoaded>
      <Board
        canUndo={canUndo}
        puzzle={puzzle}
        size={size}
        solved={solved}
        getCellState={getCellState}
        reset={handleReset}
        setCellState={setCellState}
        undo={undo}
      />
    </LazyLoaded>
  )
}

export default PlayPage
