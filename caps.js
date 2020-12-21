'use strict';

// Event Hub
const events = require('./events');

// Require our body parts ... they will hear our events
require('./driver');
require('./vendor');

events.on('pickup', (payload) => {
  events.emit('pickup', payload);
});
