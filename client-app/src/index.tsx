import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import App from './App';
import './layout/styles.css';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);
