import { combineReducers } from 'redux';

import cartsReducer from './carts';
import ordersReducer from './orders';
import membershipsReducer from './memberships';
import paymentsReducer from './payments';
import plansReducer from './plans';
import tagsReducer from './tags';
import productsReducer from './products';
import productTypesReducer from './product_types';
import categoriesReducer from './categories';
import currenciesReducer from './currencies';
import usersReducer from './users';

export default combineReducers({
  carts: cartsReducer,
  currencies: currenciesReducer,
  categories: categoriesReducer,
  memberships: membershipsReducer,
  orders: ordersReducer,
  payments: paymentsReducer,
  productTypes: productTypesReducer,
  tags: tagsReducer,
  plans: plansReducer,
  products: productsReducer,
  users: usersReducer,
});
