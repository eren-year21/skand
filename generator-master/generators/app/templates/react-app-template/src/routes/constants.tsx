import * as React from 'react';
import { RouteProps } from 'react-router-dom';
import { ForbiddenPage, RootPage } from '../ui/pages';
import { IPaths } from './types';

export const PATH_ENUM: IPaths = {
  root: '/',
  forbidden: '/forbidden',
};

export const ROUTE_LIST: RouteProps[] = [
  {
    path: PATH_ENUM.root,
    component: RootPage,
    exact: true,
  },
  {
    path: PATH_ENUM.forbidden,
    render: (routerProps) => <ForbiddenPage toIndexPage={() => { routerProps.history.push(PATH_ENUM.root); }} />,
    exact: false,
  },
];
