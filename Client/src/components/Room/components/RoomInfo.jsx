import React from 'react';
import { Box, List, ListItem, ListItemText, Divider } from '@material-ui/core';

export default function RoomInfo({ name, room, users = [1, 2, 3, 4] }) {
  return (
    <React.Fragment>
      <Box height="88vh" marginLeft={1} borderRight={1}>
        <List>
          <ListItem>
            <ListItemText
              primary={
                <React.Fragment>
                  <b>Room: </b>
                  {room}
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <React.Fragment>
                  <b>Users: </b>
                  {name}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider />
          {users.map((val, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={index + 1 + '.' + val.name} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </React.Fragment>
  );
}
