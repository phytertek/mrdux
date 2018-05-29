import { curry } from './core';

export const has = curry((k: string, o: object): boolean =>
  o.hasOwnProperty(k)
);
export const keys = (o: object): string[] => Object.keys(o);
export const vals = (o: object): any[] => keys(o).map(k => o[k]);
export const entries = (o: object): Array<Array<any>> =>
  keys(o).map(k => [k, o[k]]);
export const assign = curry((k: string | number, v: any, o: object) => ({
  ...o,
  [k]: v
}));
export const remove = curry((k: string, o: object): object =>
  keys(o).reduce((r, ok) => (k !== ok ? { ...r, [ok]: o[ok] } : r), {})
);
export const evolve = curry((m: object, o: object): object =>
  keys(m).reduce((r, k) => (has(k)(o) ? { ...r, [k]: m[k](o[k]) } : r), o)
);
export const getFirstKey = (o: object): string | number => keys(o)[0];
export const getLastKey = (o: object): string | number => keys(o).slice(-1)[0];
export const getFirstVal = (o: object): any => o[getFirstKey(o)];
export const getLastVal = (o: object): any => o[getLastKey(o)];
export const dropFirstKey = (o: object): object => remove(getFirstKey(o), o);
export const dropLastKey = (o: object): object => remove(getLastKey(o), o);
