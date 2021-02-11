import { useEffect, useState } from 'react'
import { useRoute } from 'wouter'
import copy from 'copy-to-clipboard'

import Button from 'components/Button'
import { ModalContext } from 'contexts/ModalContext'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { useContextSecure as useContext } from 'utils/contextSecure'
import { ROUTES } from 'constants/router.constants'
import { DEFAULT_SIZE } from 'constants/puzzle.constants'

import styles from 'styles/components/Header.module.css'
import { encodePuzzle } from 'utils/puzzleEncoder'
import { createPuzzleFromSize } from 'utils/puzzleCreator'

const Header = () => {
  const { finished, puzzle, reset, setPuzzle } = useContext(PuzzleContext)
  const { notice } = useContext(ModalContext)

  const handleCopy = () => {
    copy(encodePuzzle(puzzle))
    notice('Copied!')
  }

  const [isRoutePlay] = useRoute(ROUTES.PLAY)
  const [isRouteCreate] = useRoute(ROUTES.CREATE)

  const [size, setSize] = useState<number>(DEFAULT_SIZE)

  const hidePuzzleButtons: boolean = !isRoutePlay || !puzzle

  useEffect(() => {
    if (puzzle) setSize(puzzle.board.length)
  }, [puzzle])

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        PIC<span>REACT</span>SS
      </h1>
      <nav className={styles.menu}>
        <Button to={ROUTES.CREATE} disabled={isRouteCreate} outlined={!isRouteCreate}>
          CREATE
        </Button>
        {puzzle && (
          <Button to={ROUTES.PLAY} disabled={isRoutePlay} outlined={!isRoutePlay}>
            PLAY
          </Button>
        )}
        <Button onClick={() => setPuzzle(createPuzzleFromSize(size))} outlined>
          NEW PUZZLE
        </Button>
        <select onChange={(e) => setSize(parseInt(e.target.value))} value={size}>
          <option value="5">5x5</option>
          <option value="10">10x10</option>
          <option value="15">15x15</option>
          <option value="20">20x20</option>
          <option value="25">25x25</option>
        </select>
        {!hidePuzzleButtons && (
          <>
            {!finished && (
              <Button onClick={reset} outlined>
                RESET
              </Button>
            )}
            <Button onClick={handleCopy} outlined>
              COPY LINK
            </Button>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
