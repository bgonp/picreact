import { FC } from 'react'
import { Redirect, Route } from 'wouter'

import CreatePage from 'pages/CreatePage'
import HomePage from 'pages/HomePage'
import LoadPage from 'pages/LoadPage'
import PlayPage from 'pages/PlayPage'
import ROUTES from 'constants/router.constants'

const Router: FC = () => (
  <>
    <Route path={ROUTES.CREATE}>
      <CreatePage />
    </Route>
    <Route path={ROUTES.HOME}>
      <HomePage />
    </Route>
    <Route path={ROUTES.LOAD}>{({ code }) => <LoadPage code={code} />}</Route>
    <Route path={ROUTES.PLAY}>
      <PlayPage />
    </Route>
    <Redirect to={ROUTES.HOME} />
  </>
)

export default Router
