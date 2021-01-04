import { FC, ReactElement, useContext, useMemo } from 'react'

import Board from 'components/Board'
import Loading from 'components/Loading'
import Wrapper from 'components/Wrapper'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { Redirect } from 'react-router-dom'
import { ROUTE_HOME } from 'constants/router.constants'

const PlayPage: FC<{}> = () => {
  const { code, puzzle } = useContext(PuzzleContext)

  const content = useMemo<ReactElement>(() => {
    if (!puzzle) return <Loading />
    return <Board puzzle={puzzle} />
  }, [puzzle])

  if (!code) return <Redirect to={ROUTE_HOME} />

  return <Wrapper>{content}</Wrapper>
}

export default PlayPage
