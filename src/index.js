import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';

import Departments from './Departments';
import Stats from './Stats';

const App = () => {
  return <div>
    <h1>Acme Employees And Departments</h1>
    <Stats />
    <Departments />
  </div>
}

ReactDOM.render(<Provider store={ store }><App /></Provider>, document.querySelector('#root'));
