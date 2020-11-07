import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from '../reducers';
import initialState from '../data/initialState';

const ConfigureStore = () => {

  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, logger)),
  );
  return store;
};

export default ConfigureStore;
