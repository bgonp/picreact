import { FC, useState } from 'react'

import Button from 'components/Button'
import Board from 'components/Board'
import { RefreshIcon, TickIcon } from 'components/icons'
import { COLORS } from 'constants/colors.constants'
import { useModalContext } from 'contexts/ModalContext'
import { CellState, Clue, Puzzle } from 'models/Puzzle'
import { createPuzzleFromCells, getClues, getEmptyBoard } from 'utils/puzzleCreator'

import styles from 'styles/components/Create.module.css'

const DISCARD_MSG = 'This will discard current puzzle.'
const SAVE_MSG = 'Puzzle created, now you can copy a direct link using share button'

type Props = {
  onCreate: (puzzle: Puzzle) => void
}

const Create: FC<Props> = ({ onCreate }) => {
  const [board, setBoard] = useState<CellState[][]>([])
  const [columns, setColumns] = useState<Clue[][]>([])
  const [rows, setRows] = useState<Clue[][]>([])

  const { showConfirm, showNotice } = useModalContext()

  const size = board.length
  const empty = board.every((line) => line.every((cell) => cell !== CellState.Filled))

  const setSize = (size: number) => () => {
    setBoard(getEmptyBoard(size))
    setColumns(Array.from({ length: size }, () => [{ value: 0, solved: true }]))
    setRows(Array.from({ length: size }, () => [{ value: 0, solved: true }]))
  }

  if (size === 0) {
    return (
      <div className={styles.create}>
        <h1>Choose puzzle size</h1>
        <div className={styles.buttons}>
          <Button primary large outlined onClick={setSize(5)}>
            5 x 5
          </Button>
          <Button primary large outlined onClick={setSize(10)}>
            10 x 10
          </Button>
          <Button primary large outlined onClick={setSize(15)}>
            15 x 15
          </Button>
          <Button primary large outlined onClick={setSize(20)}>
            20 x 20
          </Button>
        </div>
      </div>
    )
  }

  const getCellState = (r: number, c: number): CellState => board[r][c]

  const setCellState = (r: number, c: number) => (state: CellState): void => {
    const nextBoard = board.map((column, i) =>
      column.map((cell, j) => (i === r && j === c ? state : cell))
    )
    const { columns: nextColumns, rows: nextRows } = getClues(nextBoard)
    setBoard(nextBoard)
    setColumns(nextColumns)
    setRows(nextRows)
  }

  const handleDiscard = () => {
    showConfirm({ content: DISCARD_MSG, onConfirm: setSize(0) })
  }

  const handleSave = () => {
    showNotice({ content: SAVE_MSG })
    onCreate(createPuzzleFromCells(board))
  }

  const buttons = (
    <>
      <Button
        key="discard"
        asIcon
        secondary
        disabled={empty}
        onClick={handleDiscard}
        title="Discard"
      >
        <RefreshIcon color={COLORS.WHITE} />
      </Button>
      <Button
        key="save"
        asIcon
        primary
        disabled={empty}
        onClick={handleSave}
        title="Save"
      >
        <TickIcon color={COLORS.WHITE} />
      </Button>
    </>
  )

  const footer = <h2 className={styles.footer}>Puzzle creation</h2>

  return (
    <Board
      buttons={buttons}
      footer={footer}
      puzzle={{ board, columns, rows }}
      size={size}
      getCellState={getCellState}
      setCellState={setCellState}
    />
  )
}

export default Create
