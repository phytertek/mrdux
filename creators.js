const { has, keys } = require('./object');
const { curry } = require('./core');

const rdx = {};

const createAction = curry((type, payload) => ({ type, payload }));
rdx.createAction = createAction;

rdx.actionsFrom = (actionsModule = {}) =>
  keys(actionsModule).reduce(
    (actionCreators, type) => ({
      ...actionCreators,
      [type]: createAction(type)
    }),
    {}
  );

rdx.reducerFrom = (initialState, actionsModule) => (
  state = initialState,
  { type, payload }
) => (has(type)(actionsModule) ? actionsModule[type](payload)(state) : state);

const generateAsyncFlow = type => actionsModule => async (
  next,
  state,
  { payload }
) => {
  try {
    next(createAction(`${type}_SENT`)());
    const response = await actionsModule[type](
      payload,
      'gET Auth Header Here',
      state
    );
    next(createAction(`${type}_SUCCESS`, response.data));
  } catch (error) {
    next(createAction(`${type}_ERROR`, error));
  }
};

rdx.asyncMiddlewareFrom = actionsModule => store => next => async action => {
  next(action);
  if (has(action.type)(actionsModule))
    generateAsyncFlow(action.type)(actionsModule)(
      next,
      store.getState(),
      action
    );
};

rdx.middlewareFrom = actionsModule => store => next => action => {
  next(action);
  if (has(action.type)(actionsModule))
    actionsModule[action.type](next, store.getState(), action);
};

module.exports = rdx;
