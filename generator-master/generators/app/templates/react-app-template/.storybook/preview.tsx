import * as React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../src/styles/theme';

// export const parameters = {
//   actions: { argTypesRegex: "^on[A-Z].*" },
// }

export const decorators = [
  (Story: React.JSXElementConstructor<any>) => (
    <MuiThemeProvider theme={theme}>
      <Story />
    </MuiThemeProvider>
  )
]
