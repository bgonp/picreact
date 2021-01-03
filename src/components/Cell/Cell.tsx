import { FC, MouseEvent, ReactElement, useCallback, useContext, useMemo } from 'react'
import classNames from 'classnames'

import { CrossIcon } from 'components/icons'
import { MainContext } from 'contexts/MainContext'
import { Color } from 'models/Color'
import { CellState } from 'models/State'

import styles from './Cell.module.css'

type Props = {
  column: number
  row: number
}

export const Cell: FC<Props> = ({ column, row }) => {
  const { finished, puzzle, getState, setState } = useContext(MainContext)

  const state = useMemo<CellState>(() => {
    return getState(column, row)
  }, [column, row, getState])

  const isFilled = useMemo<boolean>(() => {
    return Boolean(puzzle?.isFilled(column, row))
  }, [column, row, puzzle])

  const isError = useMemo<boolean>(() => {
    return isFilled !== (state === CellState.Filled)
  }, [state, isFilled])

  const className = useMemo<string>(
    () =>
      classNames(styles.cell, {
        [styles.borderTop]: column % 5 === 0,
        [styles.borderBottom]: column % 5 === 4,
        [styles.borderLeft]: row % 5 === 0,
        [styles.borderRight]: row % 5 === 4,
      }),
    [column, row]
  )

  const toggleCrossState = useCallback<(e: MouseEvent) => void>(
    (e) => {
      e.preventDefault()
      if (state === CellState.Cross) setState(column, row, CellState.Empty)
      else if (state === CellState.Empty) setState(column, row, CellState.Cross)
    },
    [state, setState]
  )

  const toggleFilledState = useCallback<(e: MouseEvent) => void>(
    (e) => {
      e.preventDefault()
      if (state === CellState.Filled) setState(column, row, CellState.Empty)
      else if (state === CellState.Empty) setState(column, row, CellState.Filled)
    },
    [state, setState]
  )

  const getCellResult = useCallback<() => ReactElement>(
    () => (
      <div className={`${styles.inner} ${isFilled ? styles.filled : ''}`}>
        {isError && <CrossIcon color={Color.Error} />}
      </div>
    ),
    [isFilled, isError]
  )

  const getCellButton = useCallback<() => ReactElement>(() => {
    const buttonClassName = classNames(styles.inner, styles.button, {
      [styles.filled]: state === CellState.Filled,
    })
    return (
      <button
        className={buttonClassName}
        onClick={toggleFilledState}
        onContextMenu={toggleCrossState}
      >
        {state === CellState.Cross && <CrossIcon />}
      </button>
    )
  }, [state, toggleCrossState, toggleFilledState])

  return <div className={className}>{finished ? getCellResult() : getCellButton()}</div>
}

export default Cell
