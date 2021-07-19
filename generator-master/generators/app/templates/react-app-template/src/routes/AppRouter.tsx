import * as React from 'react';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { PATH_ENUM, ROUTE_LIST } from './constants';
import { NotFoundPage } from '../ui/pages';

export const AppRouter = () => (
  <Router>
    <Switch>
      {
        ROUTE_LIST.map((route) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Route {...route} />
        ))
      }
      <Route
        render={(routerProps) => <NotFoundPage toIndexPage={() => { routerProps.history.push(PATH_ENUM.root); }} />}
      />
    </Switch>
  </Router>
);
