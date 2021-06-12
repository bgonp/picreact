import { useCallback, useState } from 'react'

type ModalType = 'confirm' | 'notice' | 'error'

export type ModalProps = {
  content: string
  type: ModalType
  onClose?: () => void
  onConfirm?: () => void
}

type ConfirmProps = Omit<ModalProps, 'type'>
type ErrorProps = Omit<ModalProps, 'type' | 'onConfirm'>
type NoticeProps = Omit<ModalProps, 'type' | 'onConfirm'>

const initialState: ModalProps = {
  content: '',
  type: 'notice' as ModalType,
}

export const useModal = (): {
  isHidden: boolean
  showConfirm: (props: ConfirmProps) => void
  showError: (props: ErrorProps) => void
  showNotice: (props: NoticeProps) => void
} & ModalProps => {
  const [isHidden, setIsHidden] = useState(true)
  const [{ content, type, onClose, onConfirm }, setState] = useState(initialState)

  const hide = useCallback(() => setIsHidden(true), [])

  const show = useCallback(({ content, type, onConfirm, onClose }: ModalProps) => {
    setIsHidden(false)
    setState({ content, type, onConfirm, onClose })
  }, [])

  const showConfirm = useCallback(
    ({ content, onConfirm, onClose }: ConfirmProps) =>
      show({ type: 'confirm', content, onConfirm, onClose }),
    [show]
  )

  const showError = useCallback(
    ({ content, onClose }: ErrorProps) => show({ type: 'error', content, onClose }),
    [show]
  )

  const showNotice = useCallback(
    ({ content, onClose }: NoticeProps) => show({ type: 'notice', content, onClose }),
    [show]
  )

  const close = useCallback(() => {
    hide()
    onClose?.()
  }, [hide, onClose])

  const confirm = useCallback(() => {
    hide()
    onConfirm?.()
  }, [hide, onConfirm])

  return {
    isHidden,
    content,
    type,
    showConfirm,
    showError,
    showNotice,
    onClose: close,
    onConfirm: confirm,
  }
}
