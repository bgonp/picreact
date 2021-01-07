import { FC, MouseEvent, TouchEvent, ReactElement, useCallback } from 'react'
import classNames from 'classnames'

import { CrossIcon } from 'components/icons'
import { CellState } from 'models/State'

import styles from './Cell.module.css'

type Props = {
  className?: string
  isFilled: boolean
  isRevealed: boolean
  isLeftClicked: boolean
  isRightClicked: boolean
  clickedState: CellState
  setClickedState: (state: CellState) => void
  state: CellState
  setState: (s: CellState) => void
}

export const Cell: FC<Props> = ({
  className = '',
  isFilled,
  isRevealed,
  isLeftClicked,
  isRightClicked,
  clickedState,
  setClickedState,
  state,
  setState,
}) => {
  const isError = isFilled !== (state === CellState.Filled)

  const handleContextMenu = useCallback<(e: MouseEvent) => void>((e) => {
    e.preventDefault()
  }, [])

  const handleTouchEnd = useCallback<(e: TouchEvent) => void>(
    (e) => {
      e.preventDefault()
      if (state === CellState.Empty) setState(CellState.Filled)
      else if (state === CellState.Filled) setState(CellState.Cross)
      else if (state === CellState.Cross) setState(CellState.Empty)
    },
    [state, setState]
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
      setClickedState(newState)
      setState(newState)
    },
    [state, setClickedState, setState]
  )

  const handleMouseEnter = useCallback<() => void>(() => {
    if (state === clickedState) return
    if (isRightClicked && state !== CellState.Filled) setState(clickedState)
    else if (isLeftClicked && state !== CellState.Cross) setState(clickedState)
  }, [isLeftClicked, isRightClicked, clickedState, state, setState])

  const getCellResult = useCallback<() => ReactElement>(() => {
    const cellClassName = classNames(styles.inner, {
      [styles.filled]: isFilled,
    })
    return (
      <div className={cellClassName}>
        {isError && <CrossIcon iconClassName={styles.errorIcon} />}
      </div>
    )
  }, [isFilled, isError])

  const getCellButton = useCallback<() => ReactElement>(() => {
    const cellClassName = classNames(styles.inner, styles.button, {
      [styles.filled]: state === CellState.Filled,
    })
    return (
      <button
        className={cellClassName}
        onContextMenu={handleContextMenu}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
      >
        {state === CellState.Cross && <CrossIcon iconClassName={styles.crossIcon} />}
      </button>
    )
  }, [state, handleContextMenu, handleMouseDown, handleMouseEnter, handleTouchEnd])

  return (
    <div className={`${styles.cell} ${className}`}>
      {isRevealed ? getCellResult() : getCellButton()}
    </div>
  )
}

export default Cell
