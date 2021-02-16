import { FC } from 'react'

import Board from 'components/Board'
import Button from 'components/Button'
import { RefreshIcon, UndoIcon } from 'components/icons'
import { ModalContext } from 'contexts/ModalContext'
import { COLORS } from 'constants/colors.constants'
import { useContextSecure as useContext } from 'utils/contextSecure'
import { CellState, Puzzle } from 'models/Puzzle'

type Props = {
  canUndo: boolean
  empty: boolean
  puzzle: Puzzle
  size: number
  solved: boolean
  getCellState: (r: number, c: number) => CellState
  reset: () => void
  setCellState: (r: number, c: number) => (value: CellState) => void
  undo: () => void
}

const Play: FC<Props> = ({
  canUndo,
  empty,
  puzzle,
  size,
  solved,
  getCellState,
  reset,
  setCellState,
  undo,
}) => {
  const { confirm } = useContext(ModalContext)

  const onReset = () =>
    confirm('This will discard current progress. Are you sure?', reset)

  const buttons = (
    <>
      <Button key="reset" asIcon secondary disabled={solved || empty} onClick={onReset}>
        <RefreshIcon color={COLORS.WHITE} />
      </Button>
      <Button key="undo" asIcon primary disabled={!canUndo} onClick={undo}>
        <UndoIcon color={COLORS.WHITE} />
      </Button>
    </>
  )

  const footer = <h2>{solved ? 'Solved!' : "Let's solve this!"}</h2>

  return (
    <Board
      blocked={solved}
      buttons={buttons}
      footer={footer}
      crossable={true}
      puzzle={puzzle}
      size={size}
      getCellState={getCellState}
      setCellState={setCellState}
    />
  )
}

export default Play
