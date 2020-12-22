'use strict';

const events = require('./events');

events.on('pickup', inTransit);
events.on('pickup', delivered);

function inTransit (payload) {
  setTimeout(() => {
    events.emit('in-transit', payload);
  }, 1000);
}

events.on('in-transit', driverPickup);

function driverPickup (payload) {
  console.log(`DRIVER: picked up ${payload.orderID}`);
}

function delivered (payload) {
  setTimeout(() => {
    // console.log(`DRIVER: delivered ${payload.orderID}`);
    events.emit('delivered', payload);
  }, 3000);
}

events.on('delivered', driverDelivered);

function driverDelivered (payload) {
  console.log(`DRIVER: delivered ${payload.orderID}`);
}




module.exports = { inTransit, delivered, driverPickup };