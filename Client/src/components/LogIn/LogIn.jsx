import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Grid, Typography, Box } from '@material-ui/core';
export default function LogIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <React.Fragment>
      <Box marginX="auto" marginTop="20vh">
        <Grid
          container
          direction="row"
          spacing={1}
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Box marginBottom={2}>
              <Typography variant="h3" align="center">
                RealTime React Chat App
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={3} />
          <Grid item xs={12} sm={4}>
            <TextField
              variant="filled"
              fullWidth
              label="Name"
              onChange={(event) => setName(event.target.value)}
            />
          </Grid>
          <Grid item sm={3} />
          <Grid item xs={3} />
          <Grid item xs={12} sm={4}>
            <TextField
              variant="filled"
              fullWidth
              label="Room"
              onChange={(event) => setRoom(event.target.value)}
            />
          </Grid>

          <Grid item xs={3} />
          <Grid item xs={3} />
          <Grid item xs={12} sm={4}>
            <Button
              variant="outlined"
              fullWidth
              component={Link}
              onClick={(e) =>
                !name || !room
                  ? e.preventDefault() & alert('Name or Room Empty')
                  : null
              }
              to={`/room?name=${name}&room=${room}`}
            >
              LogIn
            </Button>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </Box>
    </React.Fragment>
  );
}
