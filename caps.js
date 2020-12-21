'use strict';

const events = require('./events');

require('./driver');
require('./vendor');

events.on('pickup', (payload) => {
  console.log('EVENT', { event: 'pickup',
    time: new Date(),
    payload} );
});

events.on('delivered', (payload) => {
  console.log('EVENT', { event: 'delivered',
    time: new Date(),
    payload} );
});

events.on('in-transit', (payload) => {
  console.log('EVENT', { event: 'in-transit',
    time: new Date(),
    payload} );
});
