import { FC, useMemo, ReactElement } from 'react'
import Cell from 'components/Cell'
import { PuzzleType } from 'models/Puzzle'

import './Board.css'

type Props = {
  puzzle: PuzzleType
}

export const Board: FC<Props> = ({ puzzle }) => {
  const cells = useMemo<ReactElement[]>(() => {
    const cells = []
    for (let i = 0; i < puzzle.size; i++) {
      for (let j = 0; j < puzzle.size; j++) {
        cells.push(<Cell key={`${i}-${j}`} column={i} row={j} />)
      }
    }
    return cells
  }, [puzzle])

  const help = useMemo<{ columns: ReactElement[]; rows: ReactElement[] }>(() => {
    const columns = []
    const rows = []
    for (let i = 0; i < puzzle.size; i++) {
      rows.push(
        <div className="help row" key={`r-${i}`}>
          {puzzle.getRowHelp(i).map((n, j) => (
            <span key={`r-${i}-${j}`}>{n}</span>
          ))}
        </div>
      )
      columns.push(
        <div className="help column" key={`c-${i}`}>
          {puzzle.getColumnHelp(i).map((n, j) => (
            <span key={`r-${i}-${j}`}>{n}</span>
          ))}
        </div>
      )
    }
    return { columns, rows }
  }, [puzzle])

  return (
    <div id="board">
      <div className="content">
        <div className="column-help">{help.columns}</div>
        <div className="row-help">{help.rows}</div>
        <div className="board">{cells}</div>
      </div>
    </div>
  )
}

export default Board
