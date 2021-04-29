import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import axiosAuth from '../utils/axios';

const middleware = [thunk];
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware, axiosAuth)),
);

export default store;

