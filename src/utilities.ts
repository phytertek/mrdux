import { curry } from './core';

// Expects objects passed in arr to have wither an id or _id property. If both exist _id is used
export const mapToId = (arr: [any]): object =>
  arr.reduce((r, o) => (o._id || o.id ? { ...r, [o._id || o.id]: o } : r), {});

export const appMapWithId: object = (obj: object) =>
  Object.keys(obj).map(key => ({ ...obj[key], id: key }));

const newUid = (obj: object): string => {
  const attempt = Date.now();
  return obj.hasOwnProperty(attempt.toString())
    ? newUid(obj)
    : attempt.toString();
};

export const assignUid = curry((val: any, obj: object) => ({
  ...obj,
  [newUid(obj).toString()]: val
}));

export const createHttpActions = (
  api: string,
  root: string,
  axios: Function
): object => {
  const createAction = (verb: string): Function => async (
    route: string,
    payload: object,
    auth: string
  ): Promise<object> =>
    await axios[verb](`${api}/${root}/${route}`, payload, {
      headers: {
        headers: auth ? { Authorization: auth } : {}
      }
    });
  return [
    { verb: 'get' },
    { verb: 'post' },
    { verb: 'put' },
    { verb: 'delete' },
    { verb: 'patch' },
    { verb: 'head' }
  ].reduce((ao, v): any => ({ ...ao, [v.verb]: createAction(v.verb) }), {});
};
