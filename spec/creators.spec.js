const creators = require('../src/creators');

describe('Creator methods (redux)', () => {
  describe('createAction', () => {
    test('exists', () => expect(creators).toHaveProperty('createAction'));
  });
  describe('asyncMiddlewareFrom', () => {
    test('exist', () => expect(creators).toHaveProperty('asyncMiddlewareFrom'));
  });
});
