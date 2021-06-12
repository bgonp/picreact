import { FC, ReactElement, useCallback, useState } from 'react'
import classNames from 'classnames'

import Cell from 'components/Cell'
import { useClickControl } from 'hooks/useClickControl'
import { CellState, Puzzle } from 'models/Puzzle'

import styles from 'styles/components/Board.module.css'
import Clues from './Clues'

type Props = {
  blocked?: boolean
  buttons?: ReactElement
  crossable?: boolean
  footer?: ReactElement
  puzzle: Puzzle
  size: number
  getCellState: (r: number, c: number) => CellState
  setCellState: (r: number, c: number) => (s: CellState) => void
}

export const Board: FC<Props> = ({
  blocked = false,
  buttons = null,
  crossable = false,
  footer = null,
  puzzle,
  size,
  getCellState,
  setCellState,
}) => {
  const [hoveredCell, setHoveredCell] = useState<[number, number]>([-1, -1])
  const [clickedState, setClickedState] = useState<CellState>(CellState.Empty)

  const {
    isLeftClicked,
    isRightClicked,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
  } = useClickControl()

  const onCellHover = useCallback<(row: number, column: number) => () => void>(
    (row, column) => () => setHoveredCell([row, column]),
    []
  )

  const onMouseLeave = useCallback<() => void>(() => {
    handleMouseLeave()
    setHoveredCell([-1, -1])
  }, [handleMouseLeave])

  const getCellClassName = useCallback<(row: number, column: number) => string>(
    (row, column) =>
      classNames(styles.cell, {
        [styles.gapBottom]: row % 5 === 4,
        [styles.gapRight]: column % 5 === 4,
        [styles.hover]: row === hoveredCell[0] || column === hoveredCell[1],
      }),
    [hoveredCell]
  )

  const className = classNames(styles.board, {
    [styles.crossable]: crossable,
    [styles.size5]: size === 5,
    [styles.size10]: size === 10,
    [styles.size15]: size === 15,
    [styles.size20]: size === 20,
  })

  return (
    <div className={className}>
      <div className={styles.content}>
        <Clues clues={puzzle.columns} columns hover={hoveredCell[1]} alt={!crossable} />
        <Clues clues={puzzle.rows} rows hover={hoveredCell[0]} alt={!crossable} />

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
                blocked={blocked}
                className={getCellClassName(r, c)}
                clickedState={clickedState}
                crossable={crossable}
                isLeftClicked={isLeftClicked}
                isRightClicked={isRightClicked}
                onHover={onCellHover(r, c)}
                state={getCellState(r, c)}
                setClickedState={setClickedState}
                setState={setCellState(r, c)}
              />
            ))
          )}
        </div>

        {buttons && <div className={styles.buttons}>{buttons}</div>}
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  )
}

export default Board
