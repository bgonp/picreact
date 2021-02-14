import { FC, useCallback, useState } from 'react'
import classNames from 'classnames'

import Button from 'components/Button'
import Cell from 'components/Cell'
import { RefreshIcon, UndoIcon } from 'components/icons'
import { COLORS } from 'constants/colors.constants'
import { useClickControl } from 'hooks/useClickControl'
import { CellState, Puzzle } from 'models/Puzzle'

import styles from 'styles/components/Board.module.css'

type Props = {
  canUndo: boolean
  puzzle: Puzzle
  size: number
  solved: boolean
  getCellState: (r: number, c: number) => CellState
  reset: () => void
  setCellState: (r: number, c: number) => (s: CellState) => void
  undo: () => void
}

export const Board: FC<Props> = ({
  canUndo,
  puzzle,
  size,
  solved,
  getCellState,
  reset,
  setCellState,
  undo,
}) => {
  const [currentCell, setCurrentCell] = useState<[number, number]>([-1, -1])
  const [clickedState, setClickedState] = useState<CellState>(CellState.Empty)

  const {
    isLeftClicked,
    isRightClicked,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
  } = useClickControl()

  const onCellHover = useCallback<(row: number, column: number) => () => void>(
    (row, column) => () => setCurrentCell([row, column]),
    []
  )

  const onMouseLeave = useCallback<() => void>(() => {
    handleMouseLeave()
    setCurrentCell([-1, -1])
  }, [handleMouseLeave])

  const getClassName = useCallback<(row: number, column: number) => string>(
    (row, column) =>
      classNames(styles.cell, {
        [styles.gapBottom]: row % 5 === 4,
        [styles.gapRight]: column % 5 === 4,
        [styles.hover]: row === currentCell[0] || column === currentCell[1],
      }),
    [currentCell]
  )

  const className = classNames(styles.board, {
    [styles.size5]: size === 5,
    [styles.size10]: size === 10,
    [styles.size15]: size === 15,
    [styles.size20]: size === 20,
    [styles.size25]: size === 25,
  })

  return (
    <div className={className}>
      <div className={styles.content}>
        <div className={styles.cluesColumns}>
          {puzzle.columns.map((column, i) => (
            <div
              key={`c-${i}`}
              className={classNames(styles.cluesLine, {
                [styles.hover]: i === currentCell[1],
              })}
            >
              {column.map(({ value, solved }, j) => (
                <span key={`c-${i}-${j}`} className={solved ? styles.ok : ''}>
                  {value}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.cluesRows}>
          {puzzle.rows.map((row, i) => (
            <div
              key={`r-${i}`}
              className={classNames(styles.cluesLine, {
                [styles.hover]: i === currentCell[0],
              })}
            >
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
          {puzzle.board.map((row, r) =>
            row.map((_, c) => (
              <Cell
                key={`${r}-${c}`}
                className={getClassName(r, c)}
                clickedState={clickedState}
                isLeftClicked={isLeftClicked}
                isRightClicked={isRightClicked}
                solved={solved}
                state={getCellState(r, c)}
                onHover={onCellHover(r, c)}
                setClickedState={setClickedState}
                setState={setCellState(r, c)}
              />
            ))
          )}
        </div>
      </div>

      <div className={styles.buttons}>
        <Button asIcon secondary disabled={solved} onClick={reset}>
          <RefreshIcon color={COLORS.WHITE} />
        </Button>
        <Button asIcon primary disabled={!canUndo} onClick={undo}>
          <UndoIcon color={COLORS.WHITE} />
        </Button>
      </div>
    </div>
  )
}

export default Board
