import { useContext, useEffect, useMemo, useState } from 'react'
import { useRoute } from 'wouter'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Button from 'components/Button'
import ROUTES from 'constants/router.constants'
import { DEFAULT_SIZE } from 'constants/puzzle.constants'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { createUrl } from 'utils/createUrl'
import { createPuzzle } from 'utils/puzzleGenerator'

import styles from './Header.module.css'

const Header = () => {
  const { code, finished, puzzle, resetState, setFinished, setPuzzle } = useContext(
    PuzzleContext
  )

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
        <Button to={ROUTES.CREATE} white primary={isRouteCreate}>
          CREATE
        </Button>
        {puzzle && (
          <Button to={ROUTES.PLAY} white primary={isRoutePlay}>
            PLAY
          </Button>
        )}
        <Button onClick={() => setPuzzle(createPuzzle(size))} white>
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
                <Button onClick={resetState} white>
                  RESET
                </Button>
                <Button onClick={setFinished} white>
                  RESOLVE
                </Button>
              </>
            )}
            <CopyToClipboard text={shareUrl}>
              <Button onClick={() => alert('Copied!')} white>
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
