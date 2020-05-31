import { combineReducers } from 'redux';

import cartsReducer from './carts';
import ordersReducer from './orders';
import membershipsReducer from './memberships';
import paymentsReducer from './payments';
import plansReducer from './plans';
import typesReducer from './product_types';
import categoriesReducer from './categories';
import currenciesReducer from './currencies';

export default combineReducers({
  carts: cartsReducer,
  currencies: currenciesReducer,
  categories: categoriesReducer,
  memberships: membershipsReducer,
  orders: ordersReducer,
  payments: paymentsReducer,
  productTypes: typesReducer,
  plans: plansReducer,
});
