import { FC, ReactElement, useContext, useEffect, useMemo } from 'react'

import Board from 'components/Board'
import Loading from 'components/Loading'
import Wrapper from 'components/Wrapper'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { useLocation } from 'wouter'
import { ROUTE_HOME } from 'constants/router.constants'

const PlayPage: FC = () => {
  const { code, finished, puzzle, getCellState, setCellState } = useContext(PuzzleContext)

  const [, navigate] = useLocation()

  const content = useMemo<ReactElement>(() => {
    if (!puzzle) return <Loading />
    return (
      <Board
        finished={finished}
        puzzle={puzzle}
        getCellState={getCellState}
        setCellState={setCellState}
      />
    )
  }, [finished, puzzle, getCellState, setCellState])

  useEffect(() => {
    if (!code) navigate(ROUTE_HOME)
  }, [code, navigate])

  return <Wrapper>{content}</Wrapper>
}

export default PlayPage
