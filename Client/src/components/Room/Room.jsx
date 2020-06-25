import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';
import { Grid, Box, TextField } from '@material-ui/core';
import Header from './components/Header';
import RoomInfo from './components/RoomInfo';
import Messages from './components/Messages';

let socket;

export default function Room({ location }) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io('/');

    setRoom(room);
    setName(name);

    socket.emit('logIn', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on('roomChange', ({ users }) => {
      setUsers(users);
    });
  }, []);

  const disconnect = () => {
    socket.emit('disconnect');
  };
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <React.Fragment>
      <Header disconnect={disconnect} />
      <Box width="99%" height="80vh">
        <Grid
          container
          direction="row"
          spacing={1}
          justify="flex-start"
          alignItems="stretch"
        >
          <Grid item xs={4} sm={4} md={3}>
            <RoomInfo room={room} name={name} users={users} />
          </Grid>

          <Grid item xs={7} sm={7} md={8}>
            <Messages messages={messages} />
          </Grid>
        </Grid>
      </Box>
      <Box style={{ top: 'auto', bottom: 0 }}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="stretch"
        >
          <Grid item xs={4} sm={4} md={3} />

          <Grid item xs={7} sm={7} md={8}>
            <TextField
              variant="filled"
              fullWidth
              label="Press Enter To Send"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyPress={(event) =>
                event.key === 'Enter' ? sendMessage(event) : null
              }
            />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
