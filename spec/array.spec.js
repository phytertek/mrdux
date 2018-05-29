const array = require('../src/array');

describe('Array methods', () => {
  test('all', () => {
    expect(array).toHaveProperty('all');
    expect(typeof array.all).toBe('function');
  });
});
