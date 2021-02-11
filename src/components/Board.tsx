import { FC, useCallback, useState } from 'react'
import classNames from 'classnames'

import Cell from 'components/Cell'
import { useClickControl } from 'hooks/useClickControl'
import { CellState, Puzzle } from 'models/Puzzle'

import styles from 'styles/components/Board.module.css'

type Props = {
  finished: boolean
  puzzle: Puzzle
  getCellState: (c: number, r: number) => CellState
  setCellState: (c: number, r: number) => (s: CellState) => void
}

export const Board: FC<Props> = ({ finished, puzzle, getCellState, setCellState }) => {
  const [currentCell, setCurrentCell] = useState<[number, number]>([-1, -1])

  const [clickedState, setClickedState] = useState<CellState>(CellState.Empty)

  const {
    isLeftClicked,
    isRightClicked,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
  } = useClickControl()

  const onCellHover = useCallback<(column: number, row: number) => () => void>(
    (column, row) => () => setCurrentCell([column, row]),
    []
  )

  const onMouseLeave = useCallback<() => void>(() => {
    handleMouseLeave()
    setCurrentCell([-1, -1])
  }, [handleMouseLeave])

  const getClassName = useCallback<(column: number, row: number) => string>(
    (column, row) =>
      classNames(styles.cell, {
        [styles.gapBottom]: column % 5 === 4,
        [styles.gapRight]: row % 5 === 4,
        [styles.hover]:
          !finished && (column === currentCell[0] || row === currentCell[1]),
      }),
    [currentCell, finished]
  )

  const className = classNames(styles.board, {
    [styles.size5]: puzzle.board.length === 5,
    [styles.size10]: puzzle.board.length === 10,
    [styles.size15]: puzzle.board.length === 15,
    [styles.size20]: puzzle.board.length === 20,
    [styles.size25]: puzzle.board.length === 25,
  })

  return (
    <div className={className}>
      <div className={styles.content}>
        <div className={styles.helpColumn}>
          {puzzle.columns.map((column, i) => (
            <div className={styles.singleHelp} key={`c-${i}`}>
              {column.map(({ value, solved }, j) => (
                <span key={`c-${i}-${j}`} className={solved ? styles.ok : ''}>
                  {value}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.helpRow}>
          {puzzle.rows.map((row, i) => (
            <div className={styles.singleHelp} key={`r-${i}`}>
              {row.map(({ value, solved }, j) => (
                <span key={`r-${i}-${j}`} className={solved ? styles.ok : ''}>
                  {value}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div
          className={styles.cells}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={onMouseLeave}
        >
          {puzzle.board.map((column, c) =>
            column.map((_, r) => (
              <Cell
                key={`${c}-${r}`}
                className={getClassName(c, r)}
                clickedState={clickedState}
                isLeftClicked={isLeftClicked}
                isRightClicked={isRightClicked}
                state={getCellState(c, r)}
                onHover={onCellHover(c, r)}
                setClickedState={setClickedState}
                setState={setCellState(c, r)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Board
