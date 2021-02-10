import { FC } from 'react'
import { Redirect, Route, Switch } from 'wouter'

import { ROUTES } from 'constants/router.constants'
import CreatePage from 'pages/CreatePage'
import HomePage from 'pages/HomePage'
import LoadPage from 'pages/LoadPage'
import PlayPage from 'pages/PlayPage'

const Router: FC = () => (
  <Switch>
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
  </Switch>
)

export default Router
