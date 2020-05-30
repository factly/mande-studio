import { combineReducers } from 'redux';

import cartsReducer from './carts';
import ordersReducer from './orders';

export default combineReducers({
  carts: cartsReducer,
  orders: ordersReducer,
});
