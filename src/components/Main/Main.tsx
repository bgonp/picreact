import { FC } from 'react'

import { PuzzleContextProvider } from 'contexts/PuzzleContext'
import Router from 'router/Router'

import 'assets/styles/index.css'

const Wrapper: FC<{}> = () => (
  <PuzzleContextProvider>
    <Router />
  </PuzzleContextProvider>
)

export default Wrapper
