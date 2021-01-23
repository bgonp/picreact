import { FC, ReactNode, useCallback, useMemo, useState } from 'react'

type ModalType = 'confirm' | 'notice' | 'error'

type ModalProps = {
  content: string
  type: ModalType
  onConfirm: () => void
  onClose: () => void
}

type ConfirmType = (content: string, onConfirm: () => void, onClose?: () => void) => void

type ErrorType = (content: string, onClose?: () => void) => void

type NoticeType = (content: string, onClose?: () => void) => void

type UseModalType = {
  confirm: ConfirmType
  error: ErrorType
  notice: NoticeType
  modal: ReactNode
}

type State = ModalProps & {
  hidden: boolean
}

const initialState = {
  hidden: true,
  content: '',
  type: 'notice' as ModalType,
  onConfirm: () => {},
  onClose: () => {},
}

const useModal = (Modal: FC<ModalProps>): UseModalType => {
  const [{ hidden, content, type, onClose, onConfirm }, setState] = useState<State>(
    initialState
  )

  const hide = useCallback<() => void>(() => {
    setState((state) => ({ ...state, hidden: true }))
  }, [])

  const show = useCallback<(params: ModalProps) => void>(
    ({ type, content, onConfirm, onClose }) => {
      setState({
        hidden: false,
        content,
        type,
        onConfirm,
        onClose,
      })
    },
    []
  )

  const confirm = useCallback<ConfirmType>(
    (content, onConfirm, onClose = () => {}) =>
      show({ type: 'confirm', content, onConfirm, onClose }),
    [show]
  )

  const error = useCallback<ErrorType>(
    (content, onClose = () => {}) =>
      show({ type: 'error', content, onConfirm: () => {}, onClose }),
    [show]
  )

  const notice = useCallback<ErrorType>(
    (content, onClose = () => {}) =>
      show({ type: 'notice', content, onConfirm: () => {}, onClose }),
    [show]
  )

  const handleConfirm = useCallback<() => void>(() => {
    hide()
    onConfirm()
  }, [hide, onConfirm])

  const handleClose = useCallback<() => void>(() => {
    hide()
    onClose()
  }, [hide, onClose])

  const modal = useMemo<ReactNode>(
    () =>
      hidden ? null : (
        <Modal
          content={content}
          type={type}
          onConfirm={handleConfirm}
          onClose={handleClose}
        />
      ),
    [Modal, content, hidden, type, handleConfirm, handleClose]
  )

  return {
    confirm,
    notice,
    error,
    modal,
  }
}

export type { ModalProps, ConfirmType, ErrorType, NoticeType }

export { useModal }
