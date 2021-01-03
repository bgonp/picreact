import { FC, useMemo, ReactElement } from 'react'
import Cell from 'components/Cell'
import { PuzzleType } from 'models/Puzzle'

import styles from './Board.module.css'

type Props = {
  puzzle: PuzzleType
}

export const Board: FC<Props> = ({ puzzle }) => {
  const cells = useMemo<ReactElement[]>(() => {
    const cells = []
    for (let i = 0; i < puzzle.size; i++) {
      for (let j = 0; j < puzzle.size; j++) {
        cells.push(<Cell key={`${i}-${j}`} column={i} row={j} />)
      }
    }
    return cells
  }, [puzzle])

  const help = useMemo<{ columns: ReactElement[]; rows: ReactElement[] }>(() => {
    const columns = []
    const rows = []
    for (let i = 0; i < puzzle.size; i++) {
      rows.push(
        <div className={styles.singleHelp} key={`r-${i}`}>
          {puzzle.getRowHelp(i).map((n, j) => (
            <span key={`r-${i}-${j}`}>{n}</span>
          ))}
        </div>
      )
      columns.push(
        <div className={styles.singleHelp} key={`c-${i}`}>
          {puzzle.getColumnHelp(i).map((n, j) => (
            <span key={`r-${i}-${j}`}>{n}</span>
          ))}
        </div>
      )
    }
    return { columns, rows }
  }, [puzzle])

  return (
    <main className={styles.board}>
      <div className={styles.content}>
        <div className={styles.helpColumn}>{help.columns}</div>
        <div className={styles.helpRow}>{help.rows}</div>
        <div className={styles.cells}>{cells}</div>
      </div>
    </main>
  )
}

export default Board
