import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import Routing from './Routing'
import db from './db/db'
import store from './store'

import './assets/styles.css'
import '../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'

db.init();

ReactDOM.render(
  <Provider store={store}>
    <Routing />
  </Provider>,
  document.getElementById('root')
);
