import { curry } from './core';

// Expects objects passed in arr to have wither an id or _id property. If both exist _id is used
export const mapToId = arr =>
  arr.reduce((r, o) => (o._id || o.id ? { ...r, [o._id || o.id]: o } : r), {});

export const appMapWithId: Object = (obj: Object) =>
  Object.keys(obj).map(key => ({ ...obj[key], id: key }));

const newUid = (obj: Object): String => {
  const attempt = Date.now();
  return obj.hasOwnProperty(attempt.toString())
    ? newUid(obj)
    : attempt.toString();
};

export const assignUid = curry((val: any, obj: object) => ({
  ...obj,
  [newUid(obj).toString()]: val
}));
