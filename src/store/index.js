import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = (initialState = {}) => {
  const middleware = [thunk];
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
  );

  return store;
};

export default configureStore;
