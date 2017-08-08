import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import Routing from './Routing'
import db from './db/db'
import reducers from './reducers/index'

import './assets/styles.css'
import '../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'

db.init();

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : f => f;

const store = createStore(reducers, {}, enhancers);

ReactDOM.render(
  <Provider store={store}>
    {Routing}
  </Provider>,
  document.getElementById('root')
);
