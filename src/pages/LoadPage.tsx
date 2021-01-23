import { FC, useEffect } from 'react'
import { useLocation } from 'wouter'

import Loading from 'components/Loading'
import Wrapper from 'components/Wrapper'
import { ROUTE_HOME, ROUTE_PLAY } from 'constants/router.constants'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { useContextSecure as useContext } from 'utils/contextSecure'
import { decodePuzzle } from 'utils/puzzleEncoder'
import { ModalContext } from 'contexts/ModalContext'

type Props = {
  code: string
}

const LoadPage: FC<Props> = ({ code }) => {
  const { setPuzzle } = useContext(PuzzleContext)
  const { error, notice } = useContext(ModalContext)

  const [, navigate] = useLocation()

  useEffect(() => {
    try {
      const puzzle = decodePuzzle(code)
      setPuzzle(puzzle)
      navigate(ROUTE_PLAY)
      notice('Puzzle loaded successfully')
    } catch (e) {
      navigate(ROUTE_HOME)
      error('Error while trying to load puzzle')
    }
  }, [code, navigate, setPuzzle, error, notice])

  return (
    <Wrapper>
      <Loading />
    </Wrapper>
  )
}

export default LoadPage
