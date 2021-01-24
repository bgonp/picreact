import { FC } from 'react'

import Button from 'components/Button'
import { ModalContext } from 'contexts/ModalContext'
import { useContextSecure as useContext } from 'utils/contextSecure'

import styles from 'styles/components/Create.module.css'

const Create: FC = () => {
  const { confirm, error, notice } = useContext(ModalContext)

  const showConfirm = () =>
    confirm(`This is a confirm dialog ${Math.random()}`, () => console.log('povale'))

  const showError = () => error(`This is an error ${Math.random()}`)

  const showNotice = () => notice(`This is a notice ${Math.random()}`)

  return (
    <main className={styles.create}>
      <Button onClick={showConfirm}>CONFIRM</Button>
      <Button onClick={showNotice} primary>
        NOTICE
      </Button>
      <Button onClick={showError} secondary>
        ERROR
      </Button>
      <Button onClick={showConfirm} outlined>
        CONFIRM
      </Button>
      <Button onClick={showNotice} primary outlined>
        NOTICE
      </Button>
      <Button onClick={showError} secondary outlined>
        ERROR
      </Button>
      <Button onClick={showConfirm} large>
        CONFIRM
      </Button>
      <Button onClick={showNotice} primary large>
        NOTICE
      </Button>
      <Button onClick={showError} secondary large>
        ERROR
      </Button>
      <Button onClick={showConfirm} large outlined>
        CONFIRM
      </Button>
      <Button onClick={showNotice} large primary outlined>
        NOTICE
      </Button>
      <Button onClick={showError} large secondary outlined>
        ERROR
      </Button>
      <Button onClick={showConfirm} asIcon>
        O
      </Button>
      <Button onClick={showNotice} asIcon primary>
        O
      </Button>
      <Button onClick={showError} asIcon secondary>
        O
      </Button>
      <Button onClick={showConfirm} asIcon outlined>
        O
      </Button>
      <Button onClick={showNotice} asIcon primary outlined>
        O
      </Button>
      <Button onClick={showError} asIcon secondary outlined>
        O
      </Button>
    </main>
  )
}

export default Create
