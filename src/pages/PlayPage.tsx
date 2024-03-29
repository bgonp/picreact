import { FC, lazy, useEffect } from 'react'
import { useLocation } from 'wouter'

import LazyLoaded from 'components/LazyLoaded'
import { usePuzzleContext } from 'contexts/PuzzleContext'
import { ROUTES } from 'constants/router.constants'

const Play = lazy(() => import('components/Play'))

const PlayPage: FC = () => {
  const { initialized, ...playProps } = usePuzzleContext()

  const [, navigate] = useLocation()

  useEffect(() => {
    if (!initialized) navigate(ROUTES.HOME)
  }, [initialized, navigate])

  return (
    <LazyLoaded>
      <Play {...playProps} />
    </LazyLoaded>
  )
}

export default PlayPage
