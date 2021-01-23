import { FC } from 'react'
import Router from 'router/Router'

import { ModalContextProvider } from 'contexts/ModalContext'
import { PuzzleContextProvider } from 'contexts/PuzzleContext'
import { initColors } from 'utils/styles'

import 'styles/index.css'

initColors()

const Wrapper: FC = () => (
  <ModalContextProvider>
    <PuzzleContextProvider>
      <Router />
    </PuzzleContextProvider>
  </ModalContextProvider>
)

export default Wrapper
