import { useEffect, useMemo, useState } from 'react'
import { useRoute } from 'wouter'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Button from 'components/Button'
import { ModalContext } from 'contexts/ModalContext'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { useContextSecure as useContext } from 'utils/contextSecure'
import { createUrl } from 'utils/createUrl'
import { createPuzzle } from 'utils/puzzleGenerator'
import { ROUTES } from 'constants/router.constants'
import { DEFAULT_SIZE } from 'constants/puzzle.constants'

import styles from 'styles/components/Header.module.css'

const Header = () => {
  const { code, finished, puzzle, resetState, setFinished, setPuzzle } = useContext(
    PuzzleContext
  )
  const { notice } = useContext(ModalContext)

  const [isRoutePlay] = useRoute(ROUTES.PLAY)

  const [isRouteCreate] = useRoute(ROUTES.CREATE)

  const [size, setSize] = useState<number>(DEFAULT_SIZE)

  const shareUrl = useMemo<string>(() => (code ? createUrl(ROUTES.LOAD, { code }) : ''), [
    code,
  ])

  const hidePuzzleButtons = !isRoutePlay || !puzzle

  useEffect(() => {
    if (puzzle) setSize(puzzle.size)
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
        <Button onClick={() => setPuzzle(createPuzzle(size))} outlined>
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
              <>
                <Button onClick={resetState} outlined>
                  RESET
                </Button>
                <Button onClick={setFinished} outlined>
                  RESOLVE
                </Button>
              </>
            )}
            <CopyToClipboard text={shareUrl}>
              <Button onClick={() => notice('Copied!')} outlined>
                COPY LINK
              </Button>
            </CopyToClipboard>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
