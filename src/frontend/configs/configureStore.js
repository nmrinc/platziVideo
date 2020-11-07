import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from '../reducers';

const ConfigureStore = () => {

  //@o To consume the state pre loaded from the server side, we access it by the next sentence.
  const preloadedState = window.__PRELOADED_STATE__;

  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const store = createStore(
    reducer,
    //@o Pass the preloadedState as the initialState.
    preloadedState,
    composeEnhancers(applyMiddleware(thunk, logger)),
  );
  return store;
};

export default ConfigureStore;
