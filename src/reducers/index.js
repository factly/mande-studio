import { combineReducers } from 'redux';

import cartItemsReducer from './cartItems';
import ordersReducer from './orders';
import membershipsReducer from './memberships';
import paymentsReducer from './payments';
import plansReducer from './plans';
import tagsReducer from './tags';
import productsReducer from './products';
import formatsReducer from './formats';
import currenciesReducer from './currencies';
import catalogsReducer from './catalogs';
import datasetsReducer from './datasets';
import mediaReducer from './media';
import usersReducer from './users';

export default combineReducers({
  cartItems: cartItemsReducer,
  catalogs: catalogsReducer,
  datasets: datasetsReducer,
  currencies: currenciesReducer,
  memberships: membershipsReducer,
  orders: ordersReducer,
  payments: paymentsReducer,
  tags: tagsReducer,
  plans: plansReducer,
  formats: formatsReducer,
  products: productsReducer,
  media: mediaReducer,
  users: usersReducer,
});
