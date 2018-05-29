export const curry = (f: Function, ...a): Function =>
  f.length <= a.length ? f(...a) : (...r) => curry(f, ...a, ...r);

export const curryModule = (o: Object): Object =>
  Object.keys(o).reduce((r, k) => ({ ...r, [k]: curry(o[k]) }), {});

const cp = m => (...f) => i => f[m]((a, fn) => fn(a), i);

export const compose: Function = cp('reduceRight');

export const pipe: Function = cp('reduce');

export const identity: Function = (v: any) => v;
