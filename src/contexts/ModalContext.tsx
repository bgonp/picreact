import { FC } from 'react'

import Modal from 'components/Modal'
import { useModal } from 'hooks/useModal'
import type { ConfirmType, ErrorType, NoticeType } from 'hooks/useModal'
import { createContextSecure as createContext } from 'utils/contextSecure'

export type ModalContextType = {
  confirm: ConfirmType
  error: ErrorType
  notice: NoticeType
}

export const ModalContext = createContext<ModalContextType>()

export const ModalContextProvider: FC = ({ children }) => {
  const { confirm, error, notice, modal } = useModal(Modal)

  return (
    <ModalContext.Provider value={{ confirm, error, notice }}>
      {children}
      {modal}
    </ModalContext.Provider>
  )
}
