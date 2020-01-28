import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import Login from '../containers/Login/Login';
import AdminHome from './AdminHome';
import ResetPassword from '../containers/Login/ResetPassword';
import history from './history';
import LoggedInRoute from './LoggedInRoute';
import PATH from '../properties/paths';

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route path={PATH.login} component={Login} />
      <LoggedInRoute otherProps={PATH.clients} component={AdminHome} />
      <LoggedInRoute otherProps={PATH.spaces} component={AdminHome} />

      <Route path={PATH.resetPassword} component={ResetPassword} />
      <Redirect from={PATH.home} to={PATH.login} />
    </Switch>
  </Router>
);

export default AppRouter;
