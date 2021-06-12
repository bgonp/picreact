import { createContext, FC, useContext } from 'react'

import Modal from 'components/Modal'
import { useModal } from 'hooks/useModal'

type ModalContextType = Pick<
  ReturnType<typeof useModal>,
  'showConfirm' | 'showError' | 'showNotice'
>

const ModalContext = createContext<ModalContextType | null>(null)

export const useModalContext = (): ModalContextType => {
  const modalContext = useContext(ModalContext)
  if (modalContext === null) throw Error('Unable to use modal outside context')

  return modalContext
}

export const ModalProvider: FC = ({ children }) => {
  const { isHidden, content, type, onClose, onConfirm, ...modalActions } = useModal()

  return (
    <ModalContext.Provider value={modalActions}>
      {children}
      {!isHidden && (
        <Modal content={content} type={type} onConfirm={onConfirm} onClose={onClose} />
      )}
    </ModalContext.Provider>
  )
}
