import { FC, lazy, useEffect } from 'react'
import { useLocation } from 'wouter'

import LazyLoaded from 'components/LazyLoaded'
import { ROUTE_PLAY } from 'constants/router.constants'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { useContextSecure as useContext } from 'utils/contextSecure'

const Welcome = lazy(() => import('components/Welcome'))

const HomePage: FC = () => {
  const { initialized, solved, setPuzzle } = useContext(PuzzleContext)

  const [, navigate] = useLocation()

  useEffect(() => {
    if (initialized && !solved) navigate(ROUTE_PLAY)
  }, [initialized, solved, navigate])

  return (
    <LazyLoaded>
      <Welcome setPuzzle={setPuzzle} />
    </LazyLoaded>
  )
}

export default HomePage
