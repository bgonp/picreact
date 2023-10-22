import { FC, lazy, useEffect } from 'react'
import { useLocation } from 'wouter'

import LazyLoaded from 'components/LazyLoaded'
import { ROUTES } from 'constants/router.constants'
import { usePuzzleContext } from 'contexts/PuzzleContext'

const Welcome = lazy(() => import('components/Welcome'))

const HomePage: FC = () => {
  const { initialized, solved, setPuzzle } = usePuzzleContext()

  const [, navigate] = useLocation()

  useEffect(() => {
    if (initialized && !solved) navigate(ROUTES.PLAY)
  }, [initialized, solved, navigate])

  return (
    <LazyLoaded>
      <Welcome setPuzzle={setPuzzle} />
    </LazyLoaded>
  )
}

export default HomePage
