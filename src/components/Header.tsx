import { FC } from 'react'
import { useLocation, useRoute } from 'wouter'

import Button from 'components/Button'
import ShareButton from 'components/ShareButton'
import { ROUTES } from 'constants/router.constants'
import { useModalContext } from 'contexts/ModalContext'

import styles from 'styles/components/Header.module.css'
import { usePuzzleContext } from 'contexts/PuzzleContext'

const Header: FC = () => {
  const { showConfirm } = useModalContext()
  const { initialized, solved, remove } = usePuzzleContext()

  const [, navigate] = useLocation()
  const [isRouteCreate] = useRoute(ROUTES.CREATE)
  const [isRouteHome] = useRoute(ROUTES.HOME)
  const [isRoutePlay] = useRoute(ROUTES.PLAY)

  const handleNavigate = (route: string) => {
    if (initialized && !solved) {
      return showConfirm({
        content: 'This will discard current puzzle. Are you sure?',
        onConfirm: () => {
          remove()
          navigate(route)
        },
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
