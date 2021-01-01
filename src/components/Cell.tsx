import { FC, MouseEvent, ReactElement, useCallback, useContext, useMemo } from 'react'
import classNames from 'classnames'

import { MainContext } from 'contexts/MainContext'
import { CellState } from 'models/State'
import CrossIcon from './CrossIcon'
import { Color } from 'models/Color'

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
      classNames('cell', {
        'border-top': column % 5 === 0,
        'border-bottom': column % 5 === 4,
        'border-left': row % 5 === 0,
        'border-right': row % 5 === 4,
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
      <div className={`${isFilled ? 'filled' : 'unfilled'}`}>
        {isError && <CrossIcon color={Color.Error} />}
      </div>
    ),
    [isFilled, isError]
  )

  const getCellButton = useCallback<() => ReactElement>(() => {
    return (
      <button
        className="button"
        onClick={toggleFilledState}
        onContextMenu={toggleCrossState}
      >
        <div className={`state-${state}`}>
          {state === CellState.Cross && <CrossIcon />}
        </div>
      </button>
    )
  }, [state, toggleCrossState, toggleFilledState])

  return <div className={className}>{finished ? getCellResult() : getCellButton()}</div>
}

export default Cell
