import { FC, useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'

import Button from 'components/Button'
import CloseButton from 'components/CloseButton'
import { ModalProps } from 'hooks/useModal'
import { useTimeout } from 'hooks/useTimeout'
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

  const handleConfirm = useCallback(() => {
    setHidden(true)
    setTimeout(onConfirm, ALERT_ANIMATION)
  }, [setTimeout, onConfirm])

  const handleClose = useCallback(() => {
    setHidden(true)
    setTimeout(onClose, ALERT_ANIMATION)
  }, [setTimeout, onClose])

  const handleMouseEnter = clearTimeout

  const handleMouseLeave = useCallback(() => {
    if (!ALERT_TIMEOUT || type === 'confirm') return
    setTimeout(handleClose, ALERT_TIMEOUT)
  }, [type, handleClose, setTimeout])

  useEffect(() => {
    clearTimeout()
    setHidden(false)
    if (!ALERT_TIMEOUT || type === 'confirm') return
    setTimeout(handleClose, ALERT_TIMEOUT)
  }, [content, type, handleClose, setTimeout, clearTimeout])

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
