import * as object from '../src/object';

describe('Object methods', () => {
  describe('has', () => {
    test('exists', () => {
      expect(object).toHaveProperty('has');
    });
    test('is a curried function', () => {
      expect(typeof object.has).toBe('function');
      expect(typeof object.has('a')).toBe('function');
      expect(object.has('a', { a: 1 })).toBeTruthy();
      expect(object.has('a')({ a: 1 })).toBeTruthy();
    });
    test('returns boolean for key existence in object', () => {
      const obj = { a: 1, b: 2 };
      expect(object.has('a', obj)).toBeTruthy();
      expect(object.has('z')(obj)).toBeFalsy();
    });
  });
  describe('keys', () => {
    test('exists', () => expect(object).toHaveProperty('keys'));
    test('is a curried function', () => {});
  });
});
