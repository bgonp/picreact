import { useContext, useMemo } from 'react'
import { generatePath, Link, useLocation } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import classNames from 'classnames'

import {
  ROUTE_CREATE,
  ROUTE_LOAD,
  ROUTE_PLAY,
  ROUTE_ROOT,
} from 'constants/router.constants'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { createPuzzle } from 'utils/puzzleGenerator'

import styles from './Header.module.css'

const Header = () => {
  const { code, finished, puzzle, resetState, setFinished, setPuzzle } = useContext(
    PuzzleContext
  )

  const { pathname } = useLocation()

  const isRoutePlay = pathname === ROUTE_PLAY

  const isRouteCreate = pathname === ROUTE_CREATE

  const hidePuzzleButtons = !isRoutePlay && !puzzle

  const playClassName = classNames(styles.button, { [styles.current]: isRoutePlay })

  const createClassName = classNames(styles.button, { [styles.current]: isRouteCreate })

  const shareUrl = useMemo<string>(
    () => (code ? ROUTE_ROOT + generatePath(ROUTE_LOAD, { code }) : ''),
    [code]
  )

  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <Link className={playClassName} to={ROUTE_PLAY}>
          PLAY
        </Link>
        <Link className={createClassName} to={ROUTE_CREATE}>
          CREATE
        </Link>
        {!hidePuzzleButtons && (
          <>
            {!finished && (
              <>
                <button className={styles.button} onClick={() => resetState()}>
                  RESET
                </button>
                <button className={styles.button} onClick={() => setFinished()}>
                  RESOLVE
                </button>
              </>
            )}
            <button className={styles.button} onClick={() => setPuzzle(createPuzzle(10))}>
              RANDOM
            </button>
            <CopyToClipboard text={shareUrl}>
              <button className={styles.button}>COPY LINK</button>
            </CopyToClipboard>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
