import { FC, MouseEvent, TouchEvent } from 'react'
import classNames from 'classnames'

import { CrossIcon } from 'components/icons'
import { COLORS } from 'constants/colors.constants'
import { CellState } from 'models/Puzzle'

import styles from 'styles/components/Cell.module.css'

type Props = {
  className?: string
  clickedState: CellState
  isLeftClicked: boolean
  isRightClicked: boolean
  state: CellState
  onHover: () => void
  setClickedState: (state: CellState) => void
  setState: (s: CellState) => void
}

export const Cell: FC<Props> = ({
  className = '',
  clickedState,
  isLeftClicked,
  isRightClicked,
  state,
  onHover,
  setClickedState,
  setState,
}) => {
  const handleContextMenu: (e: MouseEvent) => void = (e) => {
    e.preventDefault()
  }

  const handleTouchEnd: (e: TouchEvent) => void = (e) => {
    e.preventDefault()
    if (state === CellState.Empty) setState(CellState.Filled)
    else if (state === CellState.Filled) setState(CellState.Cross)
    else if (state === CellState.Cross) setState(CellState.Empty)
  }

  const handleMouseDown: (e: MouseEvent) => void = ({ button }) => {
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
  }

  const handleMouseEnter: () => void = () => {
    onHover()
    if (state === clickedState) return
    if (isRightClicked && state !== CellState.Filled) setState(clickedState)
    else if (isLeftClicked && state !== CellState.Cross) setState(clickedState)
  }

  const buttonClassName = classNames(styles.inner, styles.button, {
    [styles.filled]: state === CellState.Filled,
  })

  return (
    <div className={`${styles.cell} ${className}`}>
      <button
        className={buttonClassName}
        onContextMenu={handleContextMenu}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
      >
        {state === CellState.Cross && <CrossIcon color={COLORS.SECOND} />}
      </button>
    </div>
  )
}

export default Cell
