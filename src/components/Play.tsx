import { FC, useCallback, useMemo } from 'react'
import { useLocation } from 'wouter'

import Board from 'components/Board'
import Button from 'components/Button'
import { RefreshIcon, UndoIcon } from 'components/icons'
import ShareButton from 'components/ShareButton'
import { useModalContext } from 'contexts/ModalContext'
import { ROUTE_HOME } from 'constants/router.constants'
import { COLORS } from 'constants/colors.constants'
import { CellState, Puzzle } from 'models/Puzzle'

import styles from 'styles/components/Play.module.css'

type Props = {
  canUndo: boolean
  empty: boolean
  puzzle: Puzzle
  size: number
  solved: boolean
  getCellState: (row: number, col: number) => CellState
  reset: () => void
  setCellState: (row: number, col: number) => (value: CellState) => void
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
  const { showConfirm } = useModalContext()

  const [, navigate] = useLocation()

  const onReset = useCallback(
    () =>
      showConfirm({
        content: 'This will discard current progress. Are you sure?',
        onConfirm: reset,
      }),
    [reset, showConfirm]
  )

  const handleClick = useCallback(() => navigate(ROUTE_HOME), [navigate])

  const buttons = useMemo(
    () => (
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
        <Button
          key="undo"
          asIcon
          primary
          disabled={!canUndo}
          onClick={undo}
          title={'Undo'}
        >
          <UndoIcon color={COLORS.WHITE} />
        </Button>
      </>
    ),
    [canUndo, empty, solved, onReset, undo]
  )

  const footer = useMemo(
    () =>
      solved ? (
        <>
          <h2 className={styles.footer}>Puzzle solved!</h2>
          <Button primary onClick={handleClick}>
            PLAY AGAIN
          </Button>
        </>
      ) : (
        <h2 className={styles.footer}>{"Let's solve this!"}</h2>
      ),
    [solved, handleClick]
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
