'use strict';
const client = require('socket.io-client');
const socket = client.connect('http://localhost:3000/caps');
let store = '1-206-flowers';

socket.emit('getall');

socket.on('delivered', message => {
  console.log('In the delivered function on client page');
  console.log('Item delivered', message);
  socket.emit('received', message);
});

const faker = require('faker');

socket.emit('join', store);

setInterval(() => {
  let newOrder =
  { store: store,
    orderID: faker.random.uuid(),
    customer: faker.name.findName(),
    address: `${faker.address.city()}, ${faker.address.state()}`};
  socket.emit('pickup', newOrder);
}, 5000);
