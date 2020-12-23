'use strict';

const client = require('socket.io-client');
const socket = client.connect('http://localhost:3000/caps');

socket.on('pickup', (payload) =>{
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderID}`);
    socket.emit('in-transit', payload);
  }, 2000);
  setTimeout(() => {
    console.log(`DRIVER: delivered ${payload.orderID}`);
    socket.emit('delivered', payload);
  }, 3000);
});

