import { combineReducers } from 'redux';

import cartsReducer from './carts';

export default combineReducers({
  carts: cartsReducer,
});
