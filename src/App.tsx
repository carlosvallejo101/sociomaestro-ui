import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { Home } from './pages/Home/';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#C60F7B',
      light: '#5c5c5c',
    },
    background: {
      default: '#dddddd',
      // default: '#631010',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
