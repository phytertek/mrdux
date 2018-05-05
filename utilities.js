const { curry } = require('./core');

const u = {};
// Expects objects passed in arr to have either _id or id properties, if both exist _id is used
u.mapToId = arr =>
  arr.reduce(
    (returnObj, obj) =>
      !!obj._id || !!obj.id
        ? { ...returnObj, [obj._id || obj.id]: obj }
        : returnObj,
    {}
  );
u.arrMapWithId = obj => Object.keys(obj).map(key => ({ ...obj[key], id: key }));
u.newUid = obj => {
  const attempt = Date.now();
  return obj.hasOwnProperty(attempt) ? newUid(obj) : attempt;
};
u.assignUid = curry((val, obj) => ({ ...obj, [newUid(obj)]: val }));

module.exports = u;
