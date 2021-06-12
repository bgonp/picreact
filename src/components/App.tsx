import { FC } from 'react'

import ErrorBoundary from 'components/ErrorBoundary'
import Main from 'components/Main'
import { ModalProvider } from 'contexts/ModalContext'
import { PuzzleContextProvider } from 'contexts/PuzzleContext'
import { initCssVariables } from 'utils/styles'

import 'styles/index.css'

initCssVariables()

const App: FC = () => (
  <ErrorBoundary>
    <ModalProvider>
      <PuzzleContextProvider>
        <Main />
      </PuzzleContextProvider>
    </ModalProvider>
  </ErrorBoundary>
)

export default App
