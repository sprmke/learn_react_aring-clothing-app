import { compose, createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

const INITIAL_STATE = undefined;

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log('action.type::', action.type);
  console.log('action.payload::', action.payload);
  console.log('currentState::', store.getState());

  next(action);

  console.log('nextState::', store.getState());
};

const middlewares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, INITIAL_STATE, composedEnhancers);
