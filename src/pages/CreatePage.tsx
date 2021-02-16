import { FC, lazy, useEffect } from 'react'
import { useLocation } from 'wouter'

import LazyLoaded from 'components/LazyLoaded'
import { ROUTE_PLAY } from 'constants/router.constants'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { useContextSecure as useContext } from 'utils/contextSecure'

const Create = lazy(() => import('components/Create'))

const CreatePage: FC = () => {
  const { initialized, solved, setPuzzle } = useContext(PuzzleContext)

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
