import { FC } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import CreatePage from 'pages/CreatePage'
import HomePage from 'pages/HomePage'
import LoadPage from 'pages/LoadPage'
import PlayPage from 'pages/PlayPage'
import ROUTES from 'constants/router.constants'

const Router: FC<{}> = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={ROUTES.CREATE} component={CreatePage} />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route exact path={ROUTES.LOAD} component={LoadPage} />
      <Route exact path={ROUTES.PLAY} component={PlayPage} />
      <Redirect to={ROUTES.PLAY} />
    </Switch>
  </BrowserRouter>
)

export default Router
