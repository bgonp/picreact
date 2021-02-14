import { FC } from 'react'
import Router from 'router/Router'

import ErrorBoundary from 'components/ErrorBoundary'
import { ModalContextProvider } from 'contexts/ModalContext'
import { PuzzleContextProvider } from 'contexts/PuzzleContext'
import { initCssVariables } from 'utils/styles'

import 'styles/index.css'

initCssVariables()

const Main: FC = () => (
  <ErrorBoundary>
    <ModalContextProvider>
      <PuzzleContextProvider>
        <Router />
      </PuzzleContextProvider>
    </ModalContextProvider>
  </ErrorBoundary>
)

export default Main
