import * as React from 'react';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { storeR } from '../store';
import theme from '../styles/theme';
import { AppRouter } from '../routes/AppRouter';

export const App = () => {
  const StoreProvider = storeR({});
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline>
        <StoreProvider>
          <AppRouter />
        </StoreProvider>
      </CssBaseline>
    </MuiThemeProvider>
  );
};
