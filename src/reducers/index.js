import { combineReducers } from 'redux';

import cartsReducer from './carts';
import ordersReducer from './orders';
import membershipsReducer from './memberships';
import paymentsReducer from './payments';

export default combineReducers({
  carts: cartsReducer,
  orders: ordersReducer,
  memberships: membershipsReducer,
  payments: paymentsReducer,
});
