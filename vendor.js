'use strict';

const events = require('./events');
const faker = require('faker');
const storeName = process.env.STORE;
var orderNumber = faker.random.number();
var customerName = faker.name.findName();
var customerAddress = faker.address.city();

setInterval(() => {
  events.emit('EVENT', { event: 'pickup',
    time: Date.now(),
    payload:
   { store: storeName,
     orderID: orderNumber,
     customer: customerName,
     address: customerAddress } });
}, 5000);

//module.exports = { pupil, eyelid };





