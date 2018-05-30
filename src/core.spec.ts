import * as core from './core';

describe('Core methods', () => {
  describe('curry', () => {
    test('exists', () => expect(core).toHaveProperty('curry'));
    test('is a function', () => expect(typeof core.curry).toBe('function'));
    test('curries argument signature', () => {
      const fn = (a, b, c) => ({ a, b, c });
      const cfn = core.curry(fn);
      expect(fn(1)).toMatchObject({ a: 1, b: undefined, c: undefined });
      expect(typeof fn(1)).not.toBe('function');
      expect(typeof cfn(1)).toBe('function');
      expect(typeof cfn(1)(2)).toBe('function');
      expect(cfn(1)(2)(3)).toMatchObject({ a: 1, b: 2, c: 3 });
      expect(cfn(1, 2)(3)).toMatchObject({ a: 1, b: 2, c: 3 });
      expect(cfn(1)(2, 3)).toMatchObject({ a: 1, b: 2, c: 3 });
      expect(cfn(1, 2, 3)).toMatchObject({ a: 1, b: 2, c: 3 });
    });
  });
  describe('curryModule', () => {
    test('exists', () => expect(core).toHaveProperty('curryModule'));
    test('is a function', () =>
      expect(typeof core.curryModule).toBe('function'));
    test('curries all functions in a module', () => {
      const mod = {
        add: (a, b) => a + b,
        sub: (a, b) => a - b
      };
      const cmod = core.curryModule(mod);
      expect(typeof cmod).toBe('object');
      expect(typeof cmod.add(1)).toBe('function');
      expect(cmod.add(1)(2)).toBe(3);
      expect(cmod.add(1, 2)).toBe(3);
      expect(typeof cmod.sub(1)).toBe('function');
      expect(cmod.sub(2)(1)).toBe(1);
      expect(cmod.sub(2, 1)).toBe(1);
    });
  });
  describe('compose', () => {
    test('exists', () => expect(core).toHaveProperty('compose'));
    test('is a function', () => expect(typeof core.compose).toBe('function'));
    test('returns a function composition (executed right to left)', () => {
      const f1 = v => v + 1;
      const f2 = v => v * 10;
      const f3 = v => v / 2;
      const cfns = core.compose(f3, f2, f1);
      expect(cfns(1)).toBe(10);
    });
  });
  describe('pipe', () => {
    test('exists', () => expect(core).toHaveProperty('pipe'));
    test('is a function', () => expect(typeof core.pipe).toBe('function'));
    test('returns a function pipeline (executed left to right)', () => {
      const f1 = v => v + 1;
      const f2 = v => v * 10;
      const f3 = v => v / 2;
      const cfns = core.pipe(f3, f2, f1);
      expect(cfns(1)).toBe(6);
    });
  });
  describe('identity', () => {
    test('exists', () => expect(core).toHaveProperty('identity'));
    test('is a function', () => expect(typeof core.identity).toBe('function'));
    test('returns the value passed to it', () =>
      expect(core.identity('test')).toBe('test'));
  });
});
