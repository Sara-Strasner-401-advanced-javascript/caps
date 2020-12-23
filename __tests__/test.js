
const caps = require('../caps');
const vendor = require('../vendor/vendor');
const driver = require('../driver/driver');

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

  it('picks up an order', () => {
    caps.emit('delivered', {orderID: 1});
    setTimeout(() => { expect(consoleSpy).toHaveBeenCalled(); }, 1000);
  });

  it('Verify the delivered emission triggers a console.log', () => {
    caps.emit('delivered', {orderID: 1});
    expect(consoleSpy).toBeCalled();
  });

  it('Verify the pickup emission triggers a console.log', () => {
    caps.emit('pickup', {orderID: 1});
    expect(consoleSpy).toBeCalled();
  });

  it('Verify the in-transit emission triggers', () => {
    caps.emit('in-transit', {orderID: 1});
    expect(consoleSpy).toBeCalled();
  });

});

//^^^^^TypeError: wsModule.Server is not a constructor