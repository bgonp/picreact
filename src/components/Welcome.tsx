import { FC } from 'react'
import { useLocation } from 'wouter'

import Button from 'components/Button'
import { ROUTE_CREATE } from 'constants/router.constants'
import { Puzzle } from 'models/Puzzle'
import { createPuzzleFromSize } from 'utils/puzzleCreator'

import styles from 'styles/components/Welcome.module.css'

type Props = {
  setPuzzle: (puzzle: Puzzle) => void
}

const Welcome: FC<Props> = ({ setPuzzle }) => {
  const [, navigate] = useLocation()

  const setEasyPuzzle = () => setPuzzle(createPuzzleFromSize(5))
  const setMediumPuzzle = () => setPuzzle(createPuzzleFromSize(10))
  const setHardPuzzle = () => setPuzzle(createPuzzleFromSize(15))
  const setExpertPuzzle = () => setPuzzle(createPuzzleFromSize(20))
  const navigateToCreate = () => navigate(ROUTE_CREATE)

  return (
    <div className={styles.welcome}>
      <h1>Load a random puzzle or create your own</h1>
      <div className={styles.buttons}>
        <Button primary large onClick={setEasyPuzzle}>
          EASY
        </Button>
        <Button primary large onClick={setMediumPuzzle}>
          MEDIUM
        </Button>
        <Button primary large onClick={setHardPuzzle}>
          HARD
        </Button>
        <Button secondary large onClick={setExpertPuzzle}>
          EXPERT
        </Button>
        <Button primary large onClick={navigateToCreate} outlined>
          CUSTOM
        </Button>
      </div>
    </div>
  )
}

export default Welcome
