import { FC, ReactElement, useContext, useMemo } from 'react'

import Board from 'components/Board'
import Loading from 'components/Loading'
import Wrapper from 'components/Wrapper'
import { MainContext } from 'contexts/MainContext'
import { createPuzzle } from 'utils/puzzleGenerator'

const PlayPage: FC<{}> = () => {
  const { code, puzzle, setPuzzle } = useContext(MainContext)

  const content = useMemo<ReactElement>(() => {
    if (!code) return <button onClick={() => setPuzzle(createPuzzle(10))}>JUGAR!</button> // TODO
    if (!puzzle) return <Loading />
    return <Board puzzle={puzzle} />
  }, [code, puzzle])

  return <Wrapper>{content}</Wrapper>
}

export default PlayPage
