import { FC, ReactElement, useCallback, useMemo, useState } from 'react'
import classNames from 'classnames'

import Cell from 'components/Cell'
import { useClickControl } from 'hooks/useClickControl'
import { PuzzleType } from 'models/Puzzle'
import { CellState } from 'models/State'
import { getHelpStatus } from 'utils/getHelpStatus'

import styles from 'styles/components/Board.module.css'

type Props = {
  colsState: number[][]
  finished: boolean
  puzzle: PuzzleType
  rowsState: number[][]
  getCellState: (c: number, r: number) => CellState
  setCellState: (c: number, r: number) => (s: CellState) => void
}

export const Board: FC<Props> = ({
  colsState,
  finished,
  puzzle,
  rowsState,
  getCellState,
  setCellState,
}) => {
  const [clickedState, setClickedState] = useState<CellState>(CellState.Empty)

  const {
    isLeftClicked,
    isRightClicked,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
  } = useClickControl()

  const getClassName = useCallback<(column: number, row: number) => string>(
    (column: number, row: number) =>
      classNames(styles.cell, {
        [styles.gapBottom]: column % 5 === 4,
        [styles.gapRight]: row % 5 === 4,
      }),
    []
  )

  const cells = useMemo<ReactElement[]>(
    () =>
      puzzle.map<ReactElement>((column, row) => (
        <Cell
          key={`${column}-${row}`}
          className={getClassName(column, row)}
          isFilled={puzzle.isFilled(column, row)}
          isRevealed={finished}
          isLeftClicked={isLeftClicked}
          isRightClicked={isRightClicked}
          clickedState={clickedState}
          setClickedState={setClickedState}
          state={getCellState(column, row)}
          setState={setCellState(column, row)}
        />
      )),
    [
      finished,
      puzzle,
      getCellState,
      setCellState,
      getClassName,
      isLeftClicked,
      isRightClicked,
      clickedState,
    ]
  )

  const getLineHelp = useCallback(
    (prefix: string, index: number, numbers: number[], state: number[]): ReactElement => {
      const isCorrect = getHelpStatus(numbers, state)
      return (
        <div className={styles.singleHelp} key={`${prefix}-${index}`}>
          {numbers.length ? (
            numbers.map((value, child) => (
              <span
                key={`${prefix}-${index}-${child}`}
                className={isCorrect[child] ? styles.ok : ''}
              >
                {value}
              </span>
            ))
          ) : (
            <span key={`${prefix}-${index}-0`}>0</span>
          )}
        </div>
      )
    },
    []
  )

  const help = useMemo<{ columns: ReactElement[]; rows: ReactElement[] }>(() => {
    const columns = []
    const rows = []
    for (let i = 0; i < puzzle.size; i++) {
      rows.push(getLineHelp('r', i, puzzle.getRowHelp(i), rowsState[i]))
      columns.push(getLineHelp('c', i, puzzle.getColumnHelp(i), colsState[i]))
    }
    return { columns, rows }
  }, [colsState, puzzle, rowsState, getLineHelp])

  const className = classNames(styles.board, {
    [styles.size5]: puzzle.size === 5,
    [styles.size10]: puzzle.size === 10,
    [styles.size15]: puzzle.size === 15,
    [styles.size20]: puzzle.size === 20,
    [styles.size25]: puzzle.size === 25,
  })

  return (
    <div className={className}>
      <div className={styles.content}>
        <div className={styles.helpColumn}>{help.columns}</div>
        <div className={styles.helpRow}>{help.rows}</div>
        <div
          className={styles.cells}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {cells}
        </div>
      </div>
    </div>
  )
}

export default Board