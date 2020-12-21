'use strict';

const events = require('./events');

events.on('pickup', inTransit);
events.on('pickup', delivered);

function inTransit (payload) {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderID}`);
    events.emit('in-transit', payload);
  }, 1000);
}

function delivered (payload) {
  setTimeout(() => {
    console.log(`DRIVER: delivered ${payload.orderID}`);
    events.emit('delivered', payload);
  }, 3000);
}