/**
 * @concept Provider Mock
 * @context When a Redux pattern it's necessary to create a mock of the structure.
 * @context So, to ensure that the component have access to the store for testing, create a mock provider.
 */

//@a Import the necessary dependencies for Redux pattern
import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import initialState from '../data/initialData';
import reducer from '../reducers';

//@a Create the store.
const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)));
//@a Create the history that will follow the Router.
const history = createBrowserHistory();

//@a Create the Mock, this will receive as props the children that will be wrapped in.
const ProviderMock = ({ children }) => (
  <Provider store={store}>
    <Router history={history}>
      {children}
    </Router>
  </Provider>
);

module.exports = ProviderMock;
