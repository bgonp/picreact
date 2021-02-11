import { FC, lazy, useEffect } from 'react'
import { useLocation } from 'wouter'

import Wrapper from 'components/Wrapper'
import { ROUTE_PLAY } from 'constants/router.constants'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { useContextSecure as useContext } from 'utils/contextSecure'

const Welcome = lazy(() => import('components/Welcome'))

const HomePage: FC = () => {
  const { puzzle, setPuzzle } = useContext(PuzzleContext)

  const [, navigate] = useLocation()

  useEffect(() => {
    if (puzzle) navigate(ROUTE_PLAY)
  }, [puzzle, navigate])

  return (
    <Wrapper>
      <Welcome setPuzzle={setPuzzle} />
    </Wrapper>
  )
}

export default HomePage
