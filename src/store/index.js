import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

const configureStore = (initialState = {}) => {
  const middleware = [thunk];
  const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

  return store;
};

export default configureStore;
