import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './routes/App';
import './assets/scss/Platzi.scss';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('App')
);