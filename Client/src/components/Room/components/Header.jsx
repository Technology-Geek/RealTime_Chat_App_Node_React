import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function Header({ disconnect }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          RealTime Chat App
        </Typography>
        <Button onClick={disconnect} component={Link} to="/" color="inherit">
          LogOut
        </Button>
      </Toolbar>
    </AppBar>
  );
}
