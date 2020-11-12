import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from '../reducers';

const ConfigureStore = () => {

  let middlewares = [];

  if (process.env.NODE_ENV === 'development') middlewares = [...middlewares, logger];

  //@o To consume the state pre loaded from the server side, we access it by the next sentence.
  const preloadedState = window.__PRELOADED_STATE__;

  //! One vulnerability of using a preloadedState on the window, it's that any user can access from the browser
  //@o To avoid this, as now that we are consuming it in the store, we can delete it from the window object.
  delete window.__PRELOADED_STATE__;

  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const store = createStore(
    reducer,
    //@o Pass the preloadedState as the initialState.
    preloadedState,
    composeEnhancers(applyMiddleware(thunk, ...middlewares)),
  );
  return store;
};

export default ConfigureStore;
