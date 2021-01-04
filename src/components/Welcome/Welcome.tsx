import { FC, useContext } from 'react'

import { PuzzleContext } from 'contexts/PuzzleContext'
import { createPuzzle } from 'utils/puzzleGenerator'

import Button from 'components/Button'

const Welcome: FC<{}> = () => {
  const { setPuzzle } = useContext(PuzzleContext)
  return (
    <Button primary large onClick={() => setPuzzle(createPuzzle(10))}>
      CREATE NEW RANDOM PUZZLE
    </Button>
  )
}

export default Welcome
