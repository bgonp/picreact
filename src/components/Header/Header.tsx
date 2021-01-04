import { useContext, useMemo, useState } from 'react'
import { generatePath, useLocation } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Button from 'components/Button'
import ROUTES from 'constants/router.constants'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { createPuzzle } from 'utils/puzzleGenerator'

import styles from './Header.module.css'

const Header = () => {
  const { code, finished, puzzle, resetState, setFinished, setPuzzle } = useContext(
    PuzzleContext
  )

  const { pathname } = useLocation()

  const [size, setSize] = useState<number>(10)

  const isRoutePlay = pathname === ROUTES.PLAY

  const isRouteCreate = pathname === ROUTES.CREATE

  const hidePuzzleButtons = !isRoutePlay || !puzzle

  const shareUrl = useMemo<string>(
    () => (code ? ROUTES.ROOT + generatePath(ROUTES.LOAD, { code }) : ''),
    [code]
  )

  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <Button to={ROUTES.CREATE} white primary={isRouteCreate}>
          CREATE
        </Button>
        {!hidePuzzleButtons && (
          <>
            <Button to={ROUTES.PLAY} white primary={isRoutePlay}>
              PLAY
            </Button>
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
