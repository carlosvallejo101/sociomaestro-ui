import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from './pages/Home/';
import { Dashboard } from './pages/Dashboard/';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#C60F7B',
      light: '#5c5c5c',
    },
    background: {
      default: '#dddddd',
    },
    secondary: {
      main: '#c5c5c5',
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
