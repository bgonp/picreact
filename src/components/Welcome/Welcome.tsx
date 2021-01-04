import { FC, useContext } from 'react'

import { PuzzleContext } from 'contexts/PuzzleContext'
import { createPuzzle } from 'utils/puzzleGenerator'

import styles from './Welcome.module.css'

const Welcome: FC<{}> = () => {
  const { setPuzzle } = useContext(PuzzleContext)
  return (
    <button className={styles.button} onClick={() => setPuzzle(createPuzzle(10))}>
      CREATE NEW RANDOM PUZZLE
    </button>
  )
}

export default Welcome
