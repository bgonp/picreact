import { FC, useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import Loading from 'components/Loading'
import Wrapper from 'components/Wrapper'
import { ROUTE_PLAY } from 'constants/router.constants'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { decodePuzzle } from 'utils/puzzleEncoder'

const LoadPage: FC<{}> = () => {
  // TODO: Error control
  const { setPuzzle } = useContext(PuzzleContext)

  const { code } = useParams<{ code: string }>()

  const history = useHistory()

  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    setPuzzle(decodePuzzle(code))
    setLoaded(true)
  }, [])

  if (loaded) history.push(ROUTE_PLAY)

  return (
    <Wrapper>
      <Loading />
    </Wrapper>
  )
}

export default LoadPage
