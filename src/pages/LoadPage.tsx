import { FC, useContext, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'

import Loading from 'components/Loading'
import Wrapper from 'components/Wrapper'
import { ROUTE_PLAY } from 'constants/router.constants'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { decodePuzzle } from 'utils/puzzleEncoder'

const LoadPage: FC<{}> = () => {
  // TODO: Error control
  const { puzzle, setPuzzle } = useContext(PuzzleContext)

  const { code } = useParams<{ code: string }>()

  useEffect(() => {
    setPuzzle(decodePuzzle(code))
  }, [code, setPuzzle])

  if (puzzle) return <Redirect to={ROUTE_PLAY} />

  return (
    <Wrapper>
      <Loading />
    </Wrapper>
  )
}

export default LoadPage
