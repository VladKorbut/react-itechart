import { createStore } from 'redux';
import reducers from './reducers/index';

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : f => f;

const store = createStore(reducers, {}, enhancers);

export default store;
