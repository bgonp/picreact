import { FC } from 'react'

import Button from 'components/Button'
import { PuzzleType } from 'models/Puzzle'
import { createPuzzle } from 'utils/puzzleGenerator'

import styles from 'styles/components/Welcome.module.css'

type Props = {
  setPuzzle: (puzzle: PuzzleType) => void
}

const Welcome: FC<Props> = ({ setPuzzle }) => {
  const setEasyPuzzle = () => setPuzzle(createPuzzle(10))
  const setMediumPuzzle = () => setPuzzle(createPuzzle(15))
  const setHardPuzzle = () => setPuzzle(createPuzzle(20))

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
