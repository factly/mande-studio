import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import axios from '../utils/axios';
import * as actions from './orders';
import * as types from '../constants/orders';
// import { ADD_CARTS } from '../constants/carts';
import { ADD_CURRENCIES } from '../constants/currencies';
import { ADD_PAYMENTS } from '../constants/payments';
import { ADD_MEDIUM } from '../constants/media';
import { ADD_TAGS } from '../constants/tags';
import { ADD_DATASETS } from '../constants/datasets';
import { ADD_PRODUCTS } from '../constants/products';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../utils/axios', () => jest.fn());

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

describe('orders actions', () => {
  it('should create an action to set loading to true', () => {
    const startLoadingAction = {
      type: types.SET_ORDER_LOADING,
      payload: { loading: true },
    };
    expect(actions.setLoading(true)).toEqual(startLoadingAction);
  });
  it('should create an action to set loading to false', () => {
    const stopLoadingAction = {
      type: types.SET_ORDER_LOADING,
      payload: { loading: false },
    };
    expect(actions.setLoading(false)).toEqual(stopLoadingAction);
  });
  it('should create an action to add order with payment and cart', () => {
    const order = {
      id: 1,
      order: 'tester t',
      payment: { id: 11, payment: 'Payment 1', currency: { id: 100, currency: 'Currency 1' } },
      cart: { id: 21, cart: 'Cart 2' },
    };

    const expectedActions = [
      {
        payload: {
          currencies: { 100: { id: 100, currency: 'Currency 1' } },
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          payments: { 11: { id: 11, payment: 'Payment 1' } },
        },
        type: ADD_PAYMENTS,
      },
      {
        payload: {
          currencies: {},
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          medium: [],
        },
        type: ADD_MEDIUM,
      },
      {
        payload: {
          currencies: {},
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          medium: [],
        },
        type: ADD_MEDIUM,
      },
      {
        payload: {
          tags: {},
        },
        type: ADD_TAGS,
      },
      {
        payload: {
          datasets: {},
        },
        type: ADD_DATASETS,
      },
      {
        payload: {
          tags: {},
        },
        type: ADD_TAGS,
      },
      {
        payload: {
          products: {},
        },
        type: ADD_PRODUCTS,
      },
      {
        type: types.ADD_ORDER,
        payload: {
          order: { id: 1, order: 'tester t', cart: { id: 21, cart: 'Cart 2' }, products: [] },
        },
      },
    ];

    const store = mockStore({ orders: initialState });

    store.dispatch(actions.addOrder(order));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add order', () => {
    const order = { id: 1, order: 'tester t' };

    const expectedActions = [
      {
        payload: {
          currencies: {},
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          payments: {},
        },
        type: ADD_PAYMENTS,
      },
      {
        payload: {
          currencies: {},
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          medium: [],
        },
        type: ADD_MEDIUM,
      },
      {
        payload: {
          currencies: {},
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          medium: [],
        },
        type: ADD_MEDIUM,
      },
      {
        payload: {
          tags: {},
        },
        type: ADD_TAGS,
      },
      {
        payload: {
          datasets: {},
        },
        type: ADD_DATASETS,
      },
      {
        payload: {
          tags: {},
        },
        type: ADD_TAGS,
      },
      {
        payload: {
          products: {},
        },
        type: ADD_PRODUCTS,
      },
      {
        type: types.ADD_ORDER,
        payload: {
          order: {
            id: 1,
            order: 'tester t',
            products: [],
          },
        },
      },
    ];

    const store = mockStore({ orders: initialState });

    store.dispatch(actions.addOrder(order));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add orders with payment and cart', () => {
    const data = [
      {
        id: 1,
        order: 'tester t',
        payment: { id: 11, payment: 'Payment 1', currency: { id: 100, currency: 'Currency 1' } },
      },
      { id: 2, order: 'testing 2', cart: { id: 21, cart: 'Cart 2' } },
    ];

    const expectedActions = [
      {
        payload: {
          currencies: { 100: { id: 100, currency: 'Currency 1' } },
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          payments: { 11: { id: 11, payment: 'Payment 1' } },
        },
        type: ADD_PAYMENTS,
      },
      {
        payload: {
          currencies: {},
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          medium: [],
        },
        type: ADD_MEDIUM,
      },
      {
        payload: {
          currencies: {},
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          medium: [],
        },
        type: ADD_MEDIUM,
      },
      {
        payload: {
          tags: {},
        },
        type: ADD_TAGS,
      },
      {
        payload: {
          datasets: {},
        },
        type: ADD_DATASETS,
      },
      {
        payload: {
          tags: {},
        },
        type: ADD_TAGS,
      },
      {
        payload: {
          products: {},
        },
        type: ADD_PRODUCTS,
      },
      {
        type: types.ADD_ORDERS,
        payload: {
          orders: {
            1: { id: 1, order: 'tester t', products: [] },
            2: { id: 2, order: 'testing 2', products: [], cart: { id: 21, cart: 'Cart 2' } },
          },
        },
      },
    ];

    const store = mockStore({ orders: initialState });

    store.dispatch(actions.addOrders(data));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add orders', () => {
    const data = [
      { id: 1, order: 'tester t' },
      { id: 2, order: 'testing 2' },
    ];

    const expectedActions = [
      {
        payload: {
          currencies: {},
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          payments: {},
        },
        type: ADD_PAYMENTS,
      },
      {
        payload: {
          currencies: {},
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          medium: [],
        },
        type: ADD_MEDIUM,
      },
      {
        payload: {
          currencies: {},
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          medium: [],
        },
        type: ADD_MEDIUM,
      },
      {
        payload: {
          tags: {},
        },
        type: ADD_TAGS,
      },
      {
        payload: {
          datasets: {},
        },
        type: ADD_DATASETS,
      },
      {
        payload: {
          tags: {},
        },
        type: ADD_TAGS,
      },
      {
        payload: {
          products: {},
        },
        type: ADD_PRODUCTS,
      },
      {
        type: types.ADD_ORDERS,
        payload: {
          orders: {
            1: { id: 1, order: 'tester t', products: [] },
            2: { id: 2, order: 'testing 2', products: [] },
          },
        },
      },
    ];

    const store = mockStore({ orders: initialState });

    store.dispatch(actions.addOrders(data));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to set request', () => {
    const req = { page: 1, limit: 5, ids: [1, 2, 3, 4, 5] };
    const setRequestAction = {
      type: types.SET_ORDER_REQUEST,
      payload: { req, total: 5 },
    };
    expect(actions.setOrderRequest(req, 5)).toEqual(setRequestAction);
  });
  it('should create an action to set ids', () => {
    const setOrderIdsRequest = {
      type: types.SET_ORDER_IDS,
      payload: { ids: [1, 2, 3] },
    };
    expect(actions.setOrderIds([1, 2, 3])).toEqual(setOrderIdsRequest);
  });
  it('should create actions to load orders when req is not in state', () => {
    const orders = [{ id: 1, name: 'Order' }];
    const resp = { data: { nodes: orders, total: 1 } };
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_ORDER_LOADING,
        payload: { loading: true },
      },
      {
        type: types.SET_ORDER_REQUEST,
        payload: {
          req: { page: 1, limit: 5, ids: [1] },
          total: 1,
        },
      },
      {
        payload: {
          currencies: {},
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          payments: {},
        },
        type: ADD_PAYMENTS,
      },
      {
        payload: {
          currencies: {},
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          medium: [],
        },
        type: ADD_MEDIUM,
      },
      {
        payload: {
          currencies: {},
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          medium: [],
        },
        type: ADD_MEDIUM,
      },
      {
        payload: {
          tags: {},
        },
        type: ADD_TAGS,
      },
      {
        payload: {
          datasets: {},
        },
        type: ADD_DATASETS,
      },
      {
        payload: {
          tags: {},
        },
        type: ADD_TAGS,
      },
      {
        payload: {
          products: {},
        },
        type: ADD_PRODUCTS,
      },
      {
        type: types.ADD_ORDERS,
        payload: { orders: { 1: { id: 1, name: 'Order', products: [] } } },
      },
      {
        type: types.SET_ORDER_IDS,
        payload: { ids: [1] },
      },
      {
        type: types.SET_ORDER_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ orders: initialState });
    store
      .dispatch(actions.loadOrders(1, 5))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
    expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/orders?page=1&limit=5` });
  });
  it('should create actions to load orders with no parameters', () => {
    const orders = [{ id: 1, name: 'Order' }];
    const resp = { data: { nodes: orders, total: 1 } };
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_ORDER_LOADING,
        payload: { loading: true },
      },
      {
        type: types.SET_ORDER_REQUEST,
        payload: {
          req: { page: 1, limit: 5, ids: [1] },
          total: 1,
        },
      },
      {
        payload: {
          currencies: {},
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          payments: {},
        },
        type: ADD_PAYMENTS,
      },
      {
        payload: {
          currencies: {},
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          medium: [],
        },
        type: ADD_MEDIUM,
      },
      {
        payload: {
          currencies: {},
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          medium: [],
        },
        type: ADD_MEDIUM,
      },
      {
        payload: {
          tags: {},
        },
        type: ADD_TAGS,
      },
      {
        payload: {
          datasets: {},
        },
        type: ADD_DATASETS,
      },
      {
        payload: {
          tags: {},
        },
        type: ADD_TAGS,
      },
      {
        payload: {
          products: {},
        },
        type: ADD_PRODUCTS,
      },
      {
        type: types.ADD_ORDERS,
        payload: { orders: { 1: { id: 1, name: 'Order', products: [] } } },
      },
      {
        type: types.SET_ORDER_IDS,
        payload: { ids: [1] },
      },
      {
        type: types.SET_ORDER_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ orders: initialState });
    store
      .dispatch(actions.loadOrders())
      .then(() => expect(store.getActions()).toEqual(expectedActions));
    expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/orders?page=1&limit=5` });
  });
  it('should create actions to load orders when req is in state', () => {
    const orders = [{ id: 1, name: 'Order' }];
    const resp = { data: { nodes: orders, total: 1 } };
    axios.mockRestore();
    axios.mockResolvedValue(resp);

    const expectedActions = [
      {
        type: types.SET_ORDER_LOADING,
        payload: { loading: true },
      },
      {
        type: types.SET_ORDER_REQUEST,
        payload: {
          req: { page: 1, limit: 5, ids: [1] },
          total: 1,
        },
      },
      {
        payload: {
          currencies: {},
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          payments: {},
        },
        type: ADD_PAYMENTS,
      },
      {
        payload: {
          currencies: {},
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          medium: [],
        },
        type: ADD_MEDIUM,
      },
      {
        payload: {
          currencies: {},
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          medium: [],
        },
        type: ADD_MEDIUM,
      },
      {
        payload: {
          tags: {},
        },
        type: ADD_TAGS,
      },
      {
        payload: {
          datasets: {},
        },
        type: ADD_DATASETS,
      },
      {
        payload: {
          tags: {},
        },
        type: ADD_TAGS,
      },
      {
        payload: {
          products: {},
        },
        type: ADD_PRODUCTS,
      },
      {
        type: types.ADD_ORDERS,
        payload: { orders: { 1: { id: 1, name: 'Order', products: [] } } },
      },
      {
        type: types.SET_ORDER_IDS,
        payload: { ids: [1] },
      },
      {
        type: types.SET_ORDER_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({
      orders: {
        loading: false,
        ids: [],
        req: [{ page: 1, limit: 5, ids: [1] }],
        items: { 1: { id: 1, name: 'Order' } },
        total: 1,
      },
    });
    store
      .dispatch(actions.loadOrders(1, 5))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
    expect(axios).toHaveBeenCalled();
  });
  it('should create actions to get order when order is not in state', () => {
    const order = { id: 1, name: 'Order' };
    const resp = { data: order };
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_ORDER_LOADING,
        payload: { loading: true },
      },
      {
        payload: {
          currencies: {},
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          payments: {},
        },
        type: ADD_PAYMENTS,
      },
      {
        payload: {
          currencies: {},
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          medium: [],
        },
        type: ADD_MEDIUM,
      },
      {
        payload: {
          currencies: {},
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          medium: [],
        },
        type: ADD_MEDIUM,
      },
      {
        payload: {
          tags: {},
        },
        type: ADD_TAGS,
      },
      {
        payload: {
          datasets: {},
        },
        type: ADD_DATASETS,
      },
      {
        payload: {
          tags: {},
        },
        type: ADD_TAGS,
      },
      {
        payload: {
          products: {},
        },
        type: ADD_PRODUCTS,
      },
      {
        type: types.ADD_ORDER,
        payload: { order: { id: 1, name: 'Order', products: [] } },
      },
      {
        type: types.SET_ORDER_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ orders: initialState });
    store
      .dispatch(actions.getOrder(1))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
    expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/orders/1` });
  });
  it('should create actions to get order when order is in state', () => {
    const order = { id: 1, name: 'Order' };
    const resp = { data: order };
    axios.mockRestore();
    axios.mockResolvedValue(resp);

    const store = mockStore({
      orders: {
        loading: false,
        ids: [],
        req: [{ page: 1, limit: 5, ids: [1] }],
        items: { 1: { id: 1, name: 'Order' } },
        total: 1,
      },
    });
    store.dispatch(actions.getOrder(1)).then(() => expect(store.getActions()).toEqual([]));
    expect(axios).not.toHaveBeenCalled();
  });
});
