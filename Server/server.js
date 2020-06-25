const express = require('express');
const socketIo = require('socket.io');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./user/User');

const app = express();

app.use(express.static('public'));

const server = app.listen(process.env.PORT || 7000, () =>
  console.log('Server is running.')
);

const io = socketIo(server);

io.on('connect', (socket) => {
  socket.on('logIn', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit('message', {
      user: 'App',
      text: `${user.name}, welcome to room ${user.room}.`,
    });

    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'App', text: `${user.name} has logIn!` });

    io.to(user.room).emit('roomChange', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'App',
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit('roomChange', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});
