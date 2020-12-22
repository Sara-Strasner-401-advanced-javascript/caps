'use strict';

require('dotenv').config();

const events = require('./events');
const faker = require('faker');
const storeName = process.env.STORE;

setInterval(() => {
  let newOrder =
  { store: storeName,
    orderID: faker.random.uuid(),
    customer: faker.name.findName(),
    address: `${faker.address.city()}, ${faker.address.state()}`};
  events.emit('pickup', newOrder);
}, 5000);

events.on('delivered', thankYou);

function thankYou (payload) {
  console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
}

module.exports = thankYou;