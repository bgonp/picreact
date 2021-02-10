import { FC, lazy } from 'react'
import { useLocation } from 'wouter'

import Wrapper from 'components/Wrapper'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { ROUTE_HOME } from 'constants/router.constants'
import { useContextSecure as useContext } from 'utils/contextSecure'

const Board = lazy(() => import('components/Board'))

const PlayPage: FC = () => {
  const {
    colsState,
    finished,
    puzzle,
    rowsState,
    getCellState,
    setCellState,
  } = useContext(PuzzleContext)

  const [, navigate] = useLocation()

  if (!puzzle) {
    navigate(ROUTE_HOME)
    return null
  }

  return (
    <Wrapper>
      <Board
        colsState={colsState}
        finished={finished}
        puzzle={puzzle}
        rowsState={rowsState}
        getCellState={getCellState}
        setCellState={setCellState}
      />
    </Wrapper>
  )
}

export default PlayPage
