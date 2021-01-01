import { FC } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import CreatePage from 'pages/CreatePage'
import LoadPage from 'pages/LoadPage'
import PlayPage from 'pages/PlayPage'
import { ROUTE_CREATE, ROUTE_LOAD, ROUTE_PLAY } from 'constants/router.constants'

const Router: FC<{}> = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={ROUTE_CREATE} component={CreatePage} />
      <Route exact path={ROUTE_LOAD} component={LoadPage} />
      <Route exact path={ROUTE_PLAY} component={PlayPage} />
      <Redirect to={ROUTE_PLAY} />
    </Switch>
  </BrowserRouter>
)

export default Router
