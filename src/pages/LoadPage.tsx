import { FC, useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { ROUTE_PLAY } from 'constants/router.constants'
import { MainContext } from 'contexts/MainContext'
import { decodePuzzle } from 'utils/puzzleEncoder'

const LoadPage: FC<{}> = () => {
  const { setPuzzle } = useContext(MainContext)

  const { code } = useParams<{ code: string }>()

  const history = useHistory()

  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    setPuzzle(decodePuzzle(code))
    setLoaded(true)
  }, [loaded])

  if (loaded) history.push(ROUTE_PLAY)

  return null
}

export default LoadPage
