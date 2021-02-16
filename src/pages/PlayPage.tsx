import { FC, lazy, useEffect } from 'react'
import { useLocation } from 'wouter'

import LazyLoaded from 'components/LazyLoaded'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { ROUTE_HOME } from 'constants/router.constants'
import { useContextSecure as useContext } from 'utils/contextSecure'

const Play = lazy(() => import('components/Play'))

const PlayPage: FC = () => {
  const {
    canUndo,
    empty,
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

  useEffect(() => {
    if (!initialized) navigate(ROUTE_HOME)
  }, [initialized, navigate])

  return (
    <LazyLoaded>
      <Play
        canUndo={canUndo}
        empty={empty}
        puzzle={puzzle}
        size={size}
        solved={solved}
        getCellState={getCellState}
        reset={reset}
        setCellState={setCellState}
        undo={undo}
      />
    </LazyLoaded>
  )
}

export default PlayPage
