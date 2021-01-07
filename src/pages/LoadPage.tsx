import { FC, useContext, useEffect } from 'react'
import { useLocation } from 'wouter'

import Loading from 'components/Loading'
import Wrapper from 'components/Wrapper'
import { ROUTE_PLAY } from 'constants/router.constants'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { decodePuzzle } from 'utils/puzzleEncoder'

type Props = {
  code: string
}

const LoadPage: FC<Props> = ({ code }) => {
  // TODO: Error control
  const { setPuzzle } = useContext(PuzzleContext)

  const [, navigate] = useLocation()

  useEffect(() => {
    setPuzzle(decodePuzzle(code))
    navigate(ROUTE_PLAY)
  }, [code, navigate, setPuzzle])

  return (
    <Wrapper>
      <Loading />
    </Wrapper>
  )
}

export default LoadPage
