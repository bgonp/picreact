import { FC, useContext } from 'react'
import { Redirect } from 'react-router-dom'

import Loading from 'components/Loading'
import Welcome from 'components/Welcome'
import Wrapper from 'components/Wrapper'
import { ROUTE_PLAY } from 'constants/router.constants'
import { PuzzleContext } from 'contexts/PuzzleContext'

const HomePage: FC<{}> = () => {
  const { code, puzzle } = useContext(PuzzleContext)

  if (puzzle) return <Redirect to={ROUTE_PLAY} />

  return <Wrapper>{code ? <Loading /> : <Welcome />}</Wrapper>
}

export default HomePage
