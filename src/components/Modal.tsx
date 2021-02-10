import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useTimeout } from 'bgon-custom-hooks'

import Button from 'components/Button'
import CloseButton from 'components/CloseButton'
import { ModalProps } from 'hooks/useModal'
import { ALERT_ANIMATION, ALERT_TIMEOUT } from 'constants/app.constants'

import styles from 'styles/components/Modal.module.css'

const Modal: FC<ModalProps> = ({ content, type, onConfirm, onClose }) => {
  const [hidden, setHidden] = useState<boolean>(false)

  const { setTimeout, clearTimeout } = useTimeout()

  const className = classNames(styles.dialog, {
    [styles.confirm]: type === 'confirm',
    [styles.error]: type === 'error',
    [styles.notice]: type === 'notice',
    [styles.hidden]: hidden,
  })

  const handleConfirm: () => void = () => {
    setHidden(true)
    setTimeout(onConfirm, ALERT_ANIMATION)
  }

  const handleClose: () => void = () => {
    setHidden(true)
    setTimeout(onClose, ALERT_ANIMATION)
  }

  const handleMouseEnter = clearTimeout

  const handleMouseLeave = () => {
    if (!ALERT_TIMEOUT || type === 'confirm') return
    setTimeout(() => setHidden(true), ALERT_TIMEOUT)
  }

  useEffect(() => {
    clearTimeout()
    setHidden(false)
    if (!ALERT_TIMEOUT || type === 'confirm') return
    setTimeout(() => setHidden(true), ALERT_TIMEOUT)
  }, [content, type, setTimeout, clearTimeout])

  if (type === 'confirm')
    return (
      <div className={className}>
        <div className={styles.content}>
          {content}
          <div className={styles.buttons}>
            <Button primary onClick={handleConfirm}>
              CONFIRM
            </Button>
            <Button secondary onClick={handleClose}>
              CLOSE
            </Button>
          </div>
        </div>
      </div>
    )

  return (
    <div
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.content}>{content}</div>
      <CloseButton
        primary={type === 'notice'}
        secondary={type === 'error'}
        onClick={handleClose}
      />
    </div>
  )
}

export default Modal
