import { FC } from 'react'
import classNames from 'classnames'

import { Clue } from 'models/Puzzle'

import styles from 'styles/components/Clues.module.css'

type Props = {
  alt?: boolean
  clues: Clue[][]
  hover: number
  columns?: boolean
  rows?: boolean
}

const Clues: FC<Props> = ({
  alt = false,
  clues,
  hover,
  columns = false,
  rows = false,
}) => {
  const asRows = rows && !columns

  const className = classNames(styles.clues, {
    [styles.columns]: !asRows,
    [styles.rows]: asRows,
    [styles.alt]: alt,
  })

  return (
    <div className={className}>
      {clues.map((line, i) => {
        const lineClassName = classNames(styles.line, { [styles.hover]: i === hover })
        return (
          <div key={`${i}`} className={lineClassName}>
            {line.map(({ value, solved }, j) => (
              <span key={`${i}-${j}`} className={solved ? styles.ok : ''}>
                {value}
              </span>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default Clues
