// 'use strict';
require('dotenv').config();

const io = require('socket.io-client');
const host = 'http://localhost:3000';
const socket = io.connect(`${host}/caps`);

const faker = require('faker');
process.env.STORE = 'Unicorn Rentals';

socket.emit('join', process.env.STORE);
console.log(process.env.STORE);

socket.on('delivered', (payload) => {
  console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
});

setInterval(() => {
  let newOrder =
  { store: process.env.STORE,
    orderID: faker.random.uuid(),
    customer: faker.name.findName(),
    address: `${faker.address.city()}, ${faker.address.state()}`};
  socket.emit('pickup', newOrder);
}, 5000);
