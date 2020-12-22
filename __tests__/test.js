// Write unit tests for each event handler function (not event triggers themselves)
// Use spies to help testing your logger methods (assert that console.log was called right)

const events = require('../events');
const vendor = require('../vendor');
const driver = require('../driver');


describe('Console Logs', () => {
  let consoleSpy;
  beforeEach(() => {
    // Attach to the console
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() =>{
    // put the console back
    consoleSpy.mockRestore();
  });

  it('Verify the delivered emission triggers a console.log', () => {
    events.emit('delivered', {orderID: 1});
    expect(consoleSpy).toBeCalled();
  });

  it('Verify the pickup emission triggers a console.log', () => {
    events.emit('pickup', {orderID: 1});
    expect(consoleSpy).toBeCalled();
  });

  it('Verify the in-transit emission triggers', () => {
    events.emit('in-transit', {orderID: 1});
    expect(consoleSpy).toBeCalled();
  });

});




