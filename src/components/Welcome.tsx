import { FC } from 'react'

import Button from 'components/Button'
import { Puzzle } from 'models/Puzzle'
import { createPuzzleFromSize } from 'utils/puzzleCreator'

import styles from 'styles/components/Welcome.module.css'

type Props = {
  setPuzzle: (puzzle: Puzzle) => void
}

const Welcome: FC<Props> = ({ setPuzzle }) => {
  const setEasyPuzzle = () => setPuzzle(createPuzzleFromSize(10))
  const setMediumPuzzle = () => setPuzzle(createPuzzleFromSize(15))
  const setHardPuzzle = () => setPuzzle(createPuzzleFromSize(20))

  return (
    <div className={styles.welcome}>
      <h2 className={styles.title}>CREATE NEW RANDOM PUZZLE</h2>
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
      </div>
    </div>
  )
}

export default Welcome
