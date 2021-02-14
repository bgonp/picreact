import { FC, lazy, useEffect } from 'react'
import { useLocation } from 'wouter'

import Wrapper from 'components/Wrapper'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { ROUTE_HOME } from 'constants/router.constants'
import { useContextSecure as useContext } from 'utils/contextSecure'
import { ModalContext } from 'contexts/ModalContext'

const Board = lazy(() => import('components/Board'))

const PlayPage: FC = () => {
  const { confirm } = useContext(ModalContext)
  const { canUndo, solved, puzzle, getCellState, reset, setCellState, undo } = useContext(
    PuzzleContext
  )

  const [, navigate] = useLocation()

  const handleReset = () =>
    confirm('This will discard current progress. Are you sure?', reset)

  useEffect(() => {
    if (puzzle.board.length === 0) navigate(ROUTE_HOME)
  }, [puzzle, navigate])

  return (
    <Wrapper>
      <Board
        canUndo={canUndo}
        puzzle={puzzle}
        solved={solved}
        getCellState={getCellState}
        reset={handleReset}
        setCellState={setCellState}
        undo={undo}
      />
    </Wrapper>
  )
}

export default PlayPage
