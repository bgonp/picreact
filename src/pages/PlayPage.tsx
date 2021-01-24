import { FC, ReactElement, useEffect, useMemo } from 'react'
import { useLocation } from 'wouter'

import Board from 'components/Board'
import Loading from 'components/Loading'
import Wrapper from 'components/Wrapper'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { ROUTE_HOME } from 'constants/router.constants'
import { useContextSecure as useContext } from 'utils/contextSecure'

const PlayPage: FC = () => {
  const {
    code,
    colsState,
    finished,
    puzzle,
    rowsState,
    getCellState,
    setCellState,
  } = useContext(PuzzleContext)

  const [, navigate] = useLocation()

  const content = useMemo<ReactElement>(() => {
    if (!puzzle) return <Loading />
    return (
      <Board
        colsState={colsState}
        finished={finished}
        puzzle={puzzle}
        rowsState={rowsState}
        getCellState={getCellState}
        setCellState={setCellState}
      />
    )
  }, [colsState, finished, puzzle, rowsState, getCellState, setCellState])

  useEffect(() => {
    if (!code) navigate(ROUTE_HOME)
  }, [code, navigate])

  return <Wrapper>{content}</Wrapper>
}

export default PlayPage
