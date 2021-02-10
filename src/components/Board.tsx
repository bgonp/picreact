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
    (column: number, row: number) =>
      classNames(styles.cell, {
        [styles.gapBottom]: column % 5 === 4,
        [styles.gapRight]: row % 5 === 4,
        [styles.hover]:
          !finished && (column === currentCell[0] || row === currentCell[1]),
      }),
    [currentCell, finished]
  )

  const cells = useMemo<ReactElement[]>(
    () =>
      puzzle.map<ReactElement>((column, row) => (
        <Cell
          key={`${column}-${row}`}
          className={getClassName(column, row)}
          clickedState={clickedState}
          isFilled={puzzle.isFilled(column, row)}
          isLeftClicked={isLeftClicked}
          isRevealed={finished}
          isRightClicked={isRightClicked}
          state={getCellState(column, row)}
          onHover={onCellHover(column, row)}
          setClickedState={setClickedState}
          setState={setCellState(column, row)}
        />
      )),
    [
      finished,
      puzzle,
      getCellState,
      setCellState,
      getClassName,
      onCellHover,
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
            <span key={`${prefix}-${index}-0`} className={styles.ok}>
              0
            </span>
          )}
        </div>
      )
    },
    []
  )

  const help = useMemo<{ columns: ReactElement[]; rows: ReactElement[] }>(
    // TODO: Optimize this
    () =>
      [...Array(puzzle.size).keys()].reduce(
        (acc: { columns: ReactElement[]; rows: ReactElement[] }, i) => {
          acc.columns.push(getLineHelp('c', i, puzzle.getColumnHelp(i), colsState[i]))
          acc.rows.push(getLineHelp('r', i, puzzle.getRowHelp(i), rowsState[i]))
          return acc
        },
        { columns: [], rows: [] }
      ),
    [colsState, puzzle, rowsState, getLineHelp]
  )

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
          onMouseLeave={onMouseLeave}
        >
          {cells}
        </div>
      </div>
    </div>
  )
}

export default Board
