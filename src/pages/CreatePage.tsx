import { FC, lazy, useEffect } from 'react'
import { useLocation } from 'wouter'

import LazyLoaded from 'components/LazyLoaded'
import { ROUTE_PLAY } from 'constants/router.constants'
import { usePuzzleContext } from 'contexts/PuzzleContext'

const Create = lazy(() => import('components/Create'))

const CreatePage: FC = () => {
  const { initialized, solved, setPuzzle } = usePuzzleContext()

  const [, navigate] = useLocation()

  useEffect(() => {
    if (initialized && !solved) navigate(ROUTE_PLAY)
  }, [initialized, solved, navigate])

  return (
    <LazyLoaded>
      <Create onCreate={setPuzzle} />
    </LazyLoaded>
  )
}

export default CreatePage
