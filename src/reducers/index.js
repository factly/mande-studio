import { combineReducers } from 'redux';

import cartsReducer from './carts';
import ordersReducer from './orders';
import membershipsReducer from './memberships';
import paymentsReducer from './payments';
import categoriesReducer from './categories';

export default combineReducers({
  carts: cartsReducer,
  categories: categoriesReducer,
  memberships: membershipsReducer,
  orders: ordersReducer,
  payments: paymentsReducer,
});
