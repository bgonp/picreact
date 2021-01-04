import { FC, ReactElement, useContext, useMemo } from 'react'

import Board from 'components/Board'
import Loading from 'components/Loading'
import Wrapper from 'components/Wrapper'
import { PuzzleContext } from 'contexts/PuzzleContext'
import Welcome from 'components/Welcome'

const PlayPage: FC<{}> = () => {
  const { code, puzzle } = useContext(PuzzleContext)

  const content = useMemo<ReactElement>(() => {
    if (!code) return <Welcome />
    if (!puzzle) return <Loading />
    return <Board puzzle={puzzle} />
  }, [code, puzzle])

  return <Wrapper>{content}</Wrapper>
}

export default PlayPage
