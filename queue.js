'use strict';

const uuid = require('uuid').v4;
require('dotenv').config();
const port = process.env.PORT;
const io = require('socket.io')(3000);
const caps = io.of('/caps');

const queue = {
  messages: {},
};


io.on('connection', (socket) => {
  console.log('You are now connected to main socket', socket.id);
});

caps.on('connection', (socket) => {
  console.log('You are now connected to the QUEUE namespace', socket.id);
  socket.on('join', room => {
    console.log('registered as', room);
    socket.join(room);
  });

  socket.on('pickup', (payload) => {
    console.log('EVENT', { event: 'pickup',
      time: new Date().toString(),
      payload} );
    caps.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    console.log('EVENT', { event: 'in-transit',
      time: new Date().toString(),
      payload} );
    caps.to(payload.store).emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    console.log('EVENT', { event: 'delivered',
      time: new Date().toString(),
      payload} );
    let id = uuid();
    queue.messages[id] = payload;
    caps.to(payload.store).emit('delivered', payload);
  });

  socket.on('getall', () => {
    Object.keys(queue.messages).forEach(id => {
      socket.emit('message', { id, payload: queue.messages[id] });
    });
  });

  socket.on('received', message => {
    delete queue.messsages[message.id];
  });
});
