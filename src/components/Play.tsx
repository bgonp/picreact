import { FC } from 'react'
import { useLocation } from 'wouter'

import Board from 'components/Board'
import Button from 'components/Button'
import { RefreshIcon, UndoIcon } from 'components/icons'
import ShareButton from 'components/ShareButton'
import { ModalContext } from 'contexts/ModalContext'
import { ROUTE_HOME } from 'constants/router.constants'
import { COLORS } from 'constants/colors.constants'
import { useContextSecure as useContext } from 'utils/contextSecure'
import { CellState, Puzzle } from 'models/Puzzle'

import styles from 'styles/components/Play.module.css'

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

  const [, navigate] = useLocation()

  const onReset = () =>
    confirm('This will discard current progress. Are you sure?', reset)

  const buttons = (
    <>
      <ShareButton />
      <Button
        key="reset"
        asIcon
        secondary
        disabled={solved || empty}
        onClick={onReset}
        title={'Reset'}
      >
        <RefreshIcon color={COLORS.WHITE} />
      </Button>
      <Button key="undo" asIcon primary disabled={!canUndo} onClick={undo} title={'Undo'}>
        <UndoIcon color={COLORS.WHITE} />
      </Button>
    </>
  )

  const handleClick = () => navigate(ROUTE_HOME)

  const footer = solved ? (
    <>
      <h2 className={styles.footer}>Puzzle solved!</h2>
      <Button primary onClick={handleClick}>
        PLAY AGAIN
      </Button>
    </>
  ) : (
    <h2 className={styles.footer}>{"Let's solve this!"}</h2>
  )

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
