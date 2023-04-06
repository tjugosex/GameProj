// server.js
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins, or specify a list of allowed origins
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log(msg);
  });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});