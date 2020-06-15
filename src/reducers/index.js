import { combineReducers } from 'redux';

import cartsReducer from './carts';
import ordersReducer from './orders';
import membershipsReducer from './memberships';
import paymentsReducer from './payments';
import plansReducer from './plans';
import tagsReducer from './tags';
import productsReducer from './products';
import currenciesReducer from './currencies';
import catalogsReducer from './catalogs';
import usersReducer from './users';

export default combineReducers({
  carts: cartsReducer,
  catalogs: catalogsReducer,
  currencies: currenciesReducer,
  memberships: membershipsReducer,
  orders: ordersReducer,
  payments: paymentsReducer,
  tags: tagsReducer,
  plans: plansReducer,
  products: productsReducer,
  users: usersReducer,
});
