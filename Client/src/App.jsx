import React from 'react';

import Room from './components/Room/Room';
import LogIn from './components/LogIn/LogIn';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  CssBaseline,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core';

export default function App() {
  const theme = createMuiTheme({ palette: { type: 'dark' } });
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Switch>
          <Route path="/" exact component={LogIn} />
          <Route path="/room" component={Room} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}
