import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import dataReducer from '../reducers/dataReducer';

const ConfigureStore = () => {

  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const store = createStore(
    combineReducers({
      data: dataReducer,
    }),
    composeEnhancers(applyMiddleware(thunk, logger)),
  );
  return store;
};

export default ConfigureStore;
