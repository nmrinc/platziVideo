import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './routes/App';
import './assets/scss/Platzi.scss';
import { ConfigureStore } from './configs/configureStore';

console.clear();

const store = ConfigureStore();

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('App'),
  );
};
render();

if (module.hot) {
  module.hot.accept('./routes/App.js', () => {
    render();
  });
}
