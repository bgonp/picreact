import {
  FC,
  MouseEvent,
  TouchEvent,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import classNames from 'classnames'

import { CrossIcon } from 'components/icons'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { Color } from 'models/Color'
import { CellState } from 'models/State'

import styles from './Cell.module.css'

type Props = {
  column: number
  isLeftClicked: boolean
  isRightClicked: boolean
  lastState: CellState
  row: number
  setLastState: (state: CellState) => void
}

export const Cell: FC<Props> = (props) => {
  const { column, isLeftClicked, isRightClicked, lastState, row, setLastState } = props
  const { finished, puzzle, getState, setState } = useContext(PuzzleContext)

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

  const handleContextMenu = useCallback<(e: MouseEvent) => void>((e) => {
    e.preventDefault()
  }, [])

  const handleTouchEnd = useCallback<(e: TouchEvent) => void>(
    (e) => {
      e.preventDefault()
      if (state === CellState.Empty) setState(column, row, CellState.Filled)
      else if (state === CellState.Filled) setState(column, row, CellState.Cross)
      else if (state === CellState.Cross) setState(column, row, CellState.Empty)
    },
    [column, row, state]
  )

  const handleMouseDown = useCallback<(e: MouseEvent) => void>(
    ({ button }) => {
      let newState: CellState = CellState.Empty
      if (button === 0) {
        if (state === CellState.Cross) return
        if (state === CellState.Empty) newState = CellState.Filled
      } else if (button === 2) {
        if (state === CellState.Filled) return
        if (state === CellState.Empty) newState = CellState.Cross
      } else {
        return
      }
      setLastState(newState)
      setState(column, row, newState)
    },
    [column, row, state, setLastState, setState]
  )

  const handleMouseEnter = useCallback<() => void>(() => {
    if (state === lastState) return
    if (isRightClicked && state !== CellState.Filled) setState(column, row, lastState)
    else if (isLeftClicked && state !== CellState.Cross) setState(column, row, lastState)
  }, [column, row, isLeftClicked, isRightClicked, lastState])

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
        onContextMenu={handleContextMenu}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
      >
        {state === CellState.Cross && <CrossIcon />}
      </button>
    )
  }, [state, handleContextMenu, handleMouseDown, handleMouseEnter, handleTouchEnd])

  return <div className={className}>{finished ? getCellResult() : getCellButton()}</div>
}

export default Cell
