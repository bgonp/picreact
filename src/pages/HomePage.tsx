import { FC, useContext, useEffect } from 'react'
import { useLocation } from 'wouter'

import Loading from 'components/Loading'
import Welcome from 'components/Welcome'
import Wrapper from 'components/Wrapper'
import { ROUTE_PLAY } from 'constants/router.constants'
import { PuzzleContext } from 'contexts/PuzzleContext'

const HomePage: FC = () => {
  const { code, puzzle, setPuzzle } = useContext(PuzzleContext)

  const [, navigate] = useLocation()

  useEffect(() => {
    if (puzzle) navigate(ROUTE_PLAY)
  }, [puzzle, navigate])

  return <Wrapper>{code ? <Loading /> : <Welcome setPuzzle={setPuzzle} />}</Wrapper>
}

export default HomePage
