import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//@concept ROUTER ON CLIENT SIDE
//@o Import Router and enclose the app with it. Pass it the history as a property.
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import App from './routes/App';
import './assets/scss/Platzi.scss';
import ConfigureStore from './configs/configureStore';

console.clear();

const store = ConfigureStore();

//@o Import the createBrowserHistory from history and then define it as a const called history.
const history = createBrowserHistory();

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
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
