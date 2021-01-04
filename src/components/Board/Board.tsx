import { FC, ReactElement, useMemo, useState } from 'react'
import classNames from 'classnames'

import Cell from 'components/Cell'
import { useClickControl } from 'hooks/useClickControl'
import { PuzzleType } from 'models/Puzzle'
import { CellState } from 'models/State'

import styles from './Board.module.css'

type Props = {
  puzzle: PuzzleType
}

export const Board: FC<Props> = ({ puzzle }) => {
  const [lastState, setLastState] = useState(CellState.Empty)

  const {
    isLeftClicked,
    isRightClicked,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
  } = useClickControl()

  const cells = useMemo<ReactElement[]>(() => {
    const cells = []
    for (let i = 0; i < puzzle.size; i++) {
      for (let j = 0; j < puzzle.size; j++) {
        cells.push(
          <Cell
            key={`${i}-${j}`}
            column={i}
            row={j}
            isLeftClicked={isLeftClicked}
            isRightClicked={isRightClicked}
            lastState={lastState}
            setLastState={setLastState}
          />
        )
      }
    }
    return cells
  }, [isLeftClicked, isRightClicked, lastState, puzzle])

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

  const className = classNames(styles.board, {
    [styles.size5]: puzzle.size === 5,
    [styles.size10]: puzzle.size === 10,
    [styles.size15]: puzzle.size === 15,
    [styles.size20]: puzzle.size === 20,
    [styles.size25]: puzzle.size === 25,
  })

  return (
    <div className={className}>
      <div
        className={styles.content}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.helpColumn}>{help.columns}</div>
        <div className={styles.helpRow}>{help.rows}</div>
        <div className={styles.cells}>{cells}</div>
      </div>
    </div>
  )
}

export default Board
