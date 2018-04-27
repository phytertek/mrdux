export const curry = (f, ...a) =>
  f.length <= a.length ? f(...a) : (...o) => curry(f, ...a, ...o);

const cp = m => (...f) => i => f[m]((v, f) => f(v), i);

export const compose = cp('reduceRight');

export const pipe = cp('reduce');

export const identity = x => x;
