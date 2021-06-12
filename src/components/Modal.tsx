import { FC, useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'

import Button from 'components/Button'
import { CloseIcon, TickIcon } from 'components/icons'
import { COLORS } from 'constants/colors.constants'
import { TIMES } from 'constants/times.constants'
import { ModalProps } from 'hooks/useModal'
import { useTimeout } from 'hooks/useTimeout'

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

  const confirm: () => void = () => {
    setHidden(true)
    onConfirm?.()
  }

  const close = useCallback(() => {
    setHidden(true)
    if (!onClose) return
    setTimeout(onClose, TIMES.ANIMATION_DURATION)
  }, [onClose, setTimeout])

  const handleMouseEnter = () => {
    if (hidden) return
    clearTimeout()
  }

  const handleMouseLeave = () => {
    if (hidden || !TIMES.ALERT_TIMEOUT || type === 'confirm') return
    setTimeout(close, TIMES.ALERT_TIMEOUT)
  }

  useEffect(() => {
    clearTimeout()
    setHidden(false)
    if (!TIMES.ALERT_TIMEOUT || type === 'confirm') return
    setTimeout(close, TIMES.ALERT_TIMEOUT)
  }, [content, type, close, setTimeout, clearTimeout])

  if (type === 'confirm')
    return (
      <div className={className}>
        <div className={styles.container}>
          <div className={styles.content}>{content}</div>
          <div className={styles.buttons}>
            <Button asIcon primary onClick={confirm}>
              <TickIcon color={COLORS.WHITE} />
            </Button>
            <Button asIcon secondary onClick={close}>
              <CloseIcon color={COLORS.WHITE} />
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
      <div className={styles.container}>
        <div className={styles.content}>{content}</div>
        <Button
          asIcon
          primary={type === 'notice'}
          secondary={type === 'error'}
          onClick={close}
        >
          <CloseIcon color={COLORS.WHITE} />
        </Button>
      </div>
    </div>
  )
}

export default Modal
