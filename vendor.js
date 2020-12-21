'use strict';

require('dotenv').config();

const events = require('./events');
const faker = require('faker');
const storeName = process.env.STORE;
var orderNumber = faker.random.uuid();
var customerName = faker.name.findName();
var customerAddress = faker.address.city();
var customerState = faker.address.state();

let newOrder =
{ store: storeName,
  orderID: orderNumber,
  customer: customerName,
  address: `${customerAddress}, ${customerState}`};
  
setInterval(() => {
  events.emit('pickup', newOrder);
}, 5000);

events.on('delivered', thankYou);

function thankYou (payload) {
  console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
}
