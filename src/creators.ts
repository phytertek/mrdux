import { has, keys } from './object';
import { curry } from './core';

export const createAction = t => (p = {}) => ({ type: t, payload: p });

export const actionsFrom = am =>
  keys(am).reduce(
    (ac, t) => ({
      ...ac,
      [t]: createAction(t)
    }),
    {}
  );

export const reducerFrom = (i, a) => (s = i, { type: t, payload: p }) =>
  has(t)(a) ? a[t](p)(s) : s;

export const generateAsyncFlow = t => a => async (n, s, { payload: p }) => {
  try {
    n(createAction(`${t}_SENT`)());
    const r = await a[t](p, 'gET Auth Header Here', s);
    n(createAction(`${t}_SUCCESS`)(r.data));
  } catch (e) {
    n(createAction(`${t}_ERROR`)(e));
  }
};

export const asyncMiddlewareFrom = am => s => n => async a => {
  n(a);
  if (has(a.type)(am)) generateAsyncFlow(a.type)(am)(n, s.getState(), a);
};

export const middlewareFrom = am => s => n => async a => {
  n(a);
  if (has(a.type)(am)) am[a.type](n, s.getState(), a);
};
