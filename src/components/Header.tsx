import { useLocation, useRoute } from 'wouter'
import copy from 'copy-to-clipboard'

import Button from 'components/Button'
import { ShareIcon } from 'components/icons'
import { ROUTES, ROUTE_LOAD } from 'constants/router.constants'
import { ModalContext } from 'contexts/ModalContext'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { useContextSecure as useContext } from 'utils/contextSecure'
import { createUrl } from 'utils/createUrl'
import { encodePuzzle } from 'utils/puzzleEncoder'

import styles from 'styles/components/Header.module.css'
import { COLORS } from 'constants/colors.constants'

const Header = () => {
  const { confirm, notice } = useContext(ModalContext)
  const { initialized, solved, puzzle, remove } = useContext(PuzzleContext)

  const [, navigate] = useLocation()
  const [isRouteCreate] = useRoute(ROUTES.CREATE)
  const [isRouteHome] = useRoute(ROUTES.HOME)
  const [isRoutePlay] = useRoute(ROUTES.PLAY)

  const handleShare = () => {
    const code = encodePuzzle(puzzle)
    const url = createUrl(ROUTE_LOAD, { code })
    copy(url)
    notice('Puzzle URL copied!')
  }

  const handleNewPuzzle = () => {
    if (solved || !initialized) {
      remove()
      navigate(ROUTES.HOME)
    } else {
      confirm('This will discard current puzzle. Are you sure?', () => {
        remove()
        navigate(ROUTES.HOME)
      })
    }
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        PIC<span>REACT</span>SS
      </h1>
      <nav className={styles.menu}>
        <Button
          to={ROUTES.PLAY}
          disabled={isRoutePlay || !initialized}
          outlined={!isRoutePlay}
        >
          PLAY
        </Button>
        <Button onClick={handleNewPuzzle} disabled={isRouteHome} outlined={!isRouteHome}>
          NEW
        </Button>
        <Button to={ROUTES.CREATE} disabled={isRouteCreate} outlined={!isRouteCreate}>
          CREATE
        </Button>
        <Button asIcon onClick={handleShare} disabled={!initialized}>
          <ShareIcon color={COLORS.FIRST} />
        </Button>
      </nav>
    </header>
  )
}

export default Header
