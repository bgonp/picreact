import { FC } from 'react'

import { MainContextProvider } from 'contexts/MainContext'
import Router from 'router/Router'

const Wrapper: FC<{}> = () => (
  <MainContextProvider>
    <Router />
  </MainContextProvider>
)

export default Wrapper
