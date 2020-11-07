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

  //! One vulnerability of using a preloadedState on the window, it's that any user can access from the browser
  //@o To avoid this, as now that we are consuming it in the store, we can delete it from the window object.
  delete window.__PRELOADED_STATE__;

  //@bug When hydrating the app, browser get this warning
  //@issue Warning: Expected server HTML to contain a matching <header> in <div>.
  //@o To solve it, define a different render method for the HMR
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

  /**
   * @concept HYDRATE
   * @context As the app is rendered from the server side,
   * @context this hydrate (pass them to the HTML rendered by ReactDOMServer) all the events needed on the app.
  */
  renderMethod(
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
