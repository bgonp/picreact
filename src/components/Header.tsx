import { FC } from 'react'
import { useLocation, useRoute } from 'wouter'

import Button from 'components/Button'
import ShareButton from 'components/ShareButton'
import { ROUTES } from 'constants/router.constants'
import { ModalContext } from 'contexts/ModalContext'
import { PuzzleContext } from 'contexts/PuzzleContext'
import { useContextSecure as useContext } from 'utils/contextSecure'

import styles from 'styles/components/Header.module.css'

const Header: FC = () => {
  const { confirm } = useContext(ModalContext)
  const { initialized, solved, remove } = useContext(PuzzleContext)

  const [, navigate] = useLocation()
  const [isRouteCreate] = useRoute(ROUTES.CREATE)
  const [isRouteHome] = useRoute(ROUTES.HOME)
  const [isRoutePlay] = useRoute(ROUTES.PLAY)

  const handleNavigate = (route: string) => {
    if (initialized && !solved) {
      return confirm('This will discard current puzzle. Are you sure?', () => {
        remove()
        navigate(route)
      })
    }
    remove()
    navigate(route)
  }

  const handleNewPuzzle = () => handleNavigate(ROUTES.HOME)

  const handleCreate = () => handleNavigate(ROUTES.CREATE)

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        PIC<span>REACT</span>
      </h1>
      <nav className={styles.menu}>
        <Button onClick={handleNewPuzzle} disabled={isRouteHome} outlined={!isRouteHome}>
          NEW
        </Button>
        <Button
          to={ROUTES.PLAY}
          disabled={isRoutePlay || !initialized}
          outlined={!isRoutePlay}
        >
          PLAY
        </Button>
        <Button onClick={handleCreate} disabled={isRouteCreate} outlined={!isRouteCreate}>
          CREATE
        </Button>
        <ShareButton disabled={!initialized} white />
      </nav>
    </header>
  )
}

export default Header
