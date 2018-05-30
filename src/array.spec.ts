import * as array from './array';

describe('Array methods', () => {
  test('all', () => {
    expect(array).toHaveProperty('all');
    expect(typeof array.all).toBe('function');
  });
});
