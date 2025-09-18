const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const { dataSubscribingChannel } = require('./service/pubsub.service.js');
require('dotenv').config();

const app = express();
const server = createServer(app);
const io = new Server(server);

const userSockets = new Map();

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('register', userId => {
    console.log(`${userId} is been registered to server`);
    userSockets.set(userId, socket);
  });

  socket.on('disconnect', () => {
    console.log('user is been disconnecting to the user');
    for (const [userId, s] of userSockets.entries()) {
      if (s.id === socket.id) {
        userSockets.delete(userId);
        break;
      }
    }
  });
});

server.listen(process.env.PORT, () => {
  console.log('server running at http://localhost:3000');
});

/**
 * 
 * const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
require('dotenv').config();

const { dataSubscribingChannel } = require('./path/to/redisSubscriber');

const app = express();
const server = createServer(app);
const io = new Server(server);

// Map of userId -> socket
const userSockets = new Map();

// Socket.IO: Handle connections
io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  // Client should emit "register" with their userId
  socket.on('register', (userId) => {
    console.log(`User ${userId} registered with socket ${socket.id}`);
    userSockets.set(userId, socket);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
    for (const [userId, s] of userSockets.entries()) {
      if (s.id === socket.id) {
        userSockets.delete(userId);
        break;
      }
    }
  });
});

// Handle incoming Redis messages
dataSubscribingChannel((message) => {
  try {
    const data = JSON.parse(message); // e.g., { userId: "123", text: "Hello!" }
    const socket = userSockets.get(data.userId);

    if (socket) {
      socket.emit('notification', data);
      console.log(`Sent notification to user ${data.userId}`);
    } else {
      console.log(`User ${data.userId} is not connected`);
    }
  } catch (err) {
    console.error('Invalid Redis message format:', err);
  }
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
});

 * 
 * 
 * 
 * 
 * 
 */
