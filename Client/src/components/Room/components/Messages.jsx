import React, { useEffect, createRef } from 'react';
import { Typography, Box, Paper, ListItem, List } from '@material-ui/core';

export default function Messages({ messages }) {
  let ref = createRef();

  useEffect(() => {
    ref.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <React.Fragment>
      <Box marginTop={1} maxHeight="83%">
        <List style={{ overflow: 'auto', maxHeight: '75vh' }}>
          {messages.map((val, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <Paper elevation={12}>
                  <Box padding={1}>
                    <Typography variant="subtitle2" color="textSecondary">
                      {val.user}
                    </Typography>
                    <Typography variant="body1">{val.text}</Typography>
                  </Box>
                </Paper>
              </ListItem>
            </React.Fragment>
          ))}
          <div
            style={{ float: 'left', clear: 'both' }}
            ref={(el) => {
              ref = el;
            }}
          />
        </List>
      </Box>
    </React.Fragment>
  );
}
