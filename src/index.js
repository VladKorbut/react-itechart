import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './Routing';
import db from './db/db'

db.init();

ReactDOM.render(<Routing />, document.getElementById('root'));
