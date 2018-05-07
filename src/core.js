const curry = (f, ...a) =>
  f.length <= a.length ? f(...a) : (...r) => curry(f, ...a, ...r);

const curryModule = o =>
  Object.keys(o).reduce((r, k) => ({ ...r, [k]: curry(o[k]) }), {});

const cp = m => (...f) => i => f[m]((a, fn) => fn(a), i);

const compose = cp('reduceRight');

const pipe = cp('reduce');

const identity = v => v;

module.exports = { curry, curryModule, compose, pipe, identity };
