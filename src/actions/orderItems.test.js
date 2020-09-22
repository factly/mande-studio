import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import axios from '../utils/axios';
import * as actions from './orderItems';
import * as types from '../constants/orderItems';
import { ADD_PRODUCTS } from '../constants/products';
import { ADD_CURRENCIES } from '../constants/currencies';
import { ADD_TAGS } from '../constants/tags';

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

describe('orderItems actions', () => {
  it('should create an action to set loading to true', () => {
    const startLoadingAction = {
      type: types.SET_ORDERITEM_LOADING,
      payload: { loading: true },
    };
    expect(actions.setLoading(true)).toEqual(startLoadingAction);
  });
  it('should create an action to set loading to false', () => {
    const stopLoadingAction = {
      type: types.SET_ORDERITEM_LOADING,
      payload: { loading: false },
    };
    expect(actions.setLoading(false)).toEqual(stopLoadingAction);
  });
  it('should create an action to add orderItems with products', () => {
    const data = [
      { id: 1, orderItem: 'tester t', product: { id: 11, product: 'Product 1' } },
      { id: 2, orderItem: 'testing 2', product: { id: 22, product: 'Product 2' } },
    ];

    const expectedActions = [
      {
        type: ADD_CURRENCIES,
        payload: {
          currencies: {},
        },
      },
      {
        type: ADD_TAGS,
        payload: {
          tags: {},
        },
      },
      {
        type: ADD_PRODUCTS,
        payload: {
          products: {
            11: { id: 11, product: 'Product 1', tags: [] },
            22: { id: 22, product: 'Product 2', tags: [] },
          },
        },
      },
      {
        type: types.ADD_ORDERITEMS,
        payload: {
          orderItems: {
            1: { id: 1, orderItem: 'tester t' },
            2: { id: 2, orderItem: 'testing 2' },
          },
        },
      },
    ];

    const store = mockStore({ orderItems: initialState });
    store.dispatch(actions.addOrderItems(data));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add orderItems without products', () => {
    const data = [
      { id: 1, orderItem: 'tester t' },
      { id: 2, orderItem: 'testing 2' },
    ];

    const expectedActions = [
      {
        type: ADD_CURRENCIES,
        payload: {
          currencies: {},
        },
      },
      {
        type: ADD_TAGS,
        payload: {
          tags: {},
        },
      },
      {
        type: ADD_PRODUCTS,
        payload: {
          products: {},
        },
      },
      {
        type: types.ADD_ORDERITEMS,
        payload: {
          orderItems: {
            1: { id: 1, orderItem: 'tester t' },
            2: { id: 2, orderItem: 'testing 2' },
          },
        },
      },
    ];

    const store = mockStore({ orderItems: initialState });

    store.dispatch(actions.addOrderItems(data));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to set request', () => {
    const req = { id: 1, page: 1, limit: 5, ids: [1, 2, 3, 4, 5] };
    const setRequestAction = {
      type: types.SET_ORDERITEM_REQUEST,
      payload: { req, total: 5 },
    };
    expect(actions.setOrderItemRequest(req, 5)).toEqual(setRequestAction);
  });
  it('should create an action to set ids', () => {
    const setOrderItemIdsRequest = {
      type: types.SET_ORDERITEM_IDS,
      payload: { ids: [1, 2, 3] },
    };
    expect(actions.setOrderItemIds([1, 2, 3])).toEqual(setOrderItemIdsRequest);
  });
  it('should create actions to load orderItems when req is not in state', () => {
    const orderItems = [{ id: 1, name: 'OrderItem' }];
    const resp = { data: { nodes: orderItems, total: 1 } };
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_ORDERITEM_LOADING,
        payload: { loading: true },
      },
      {
        type: types.SET_ORDERITEM_REQUEST,
        payload: {
          req: { id: 1, page: 1, limit: 5, ids: [1] },
          total: 1,
        },
      },
      {
        type: ADD_CURRENCIES,
        payload: {
          currencies: {},
        },
      },
      {
        type: ADD_TAGS,
        payload: {
          tags: {},
        },
      },
      {
        type: ADD_PRODUCTS,
        payload: {
          products: {},
        },
      },
      {
        type: types.ADD_ORDERITEMS,
        payload: { orderItems: { 1: { id: 1, name: 'OrderItem' } } },
      },
      {
        type: types.SET_ORDERITEM_IDS,
        payload: { ids: [1] },
      },
      {
        type: types.SET_ORDERITEM_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ orderItems: initialState });
    store
      .dispatch(actions.loadOrderItems(1, 1, 5))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
    expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/orders/1/items?page=1&limit=5` });
  });
  it('should create actions to load orderItems when req is in state', () => {
    const orderItems = [{ id: 1, name: 'OrderItem' }];
    const resp = { data: { nodes: orderItems, total: 1 } };
    axios.mockRestore();
    axios.mockResolvedValue(resp);

    const expectedActions = [
      {
        type: types.SET_ORDERITEM_IDS,
        payload: { ids: [1] },
      },
    ];

    const store = mockStore({
      orderItems: {
        loading: false,
        ids: [],
        req: [{ id: 1, page: 1, limit: 5, ids: [1] }],
        items: { 1: { id: 1, name: 'OrderItem' } },
        total: 1,
      },
    });
    store
      .dispatch(actions.loadOrderItems(1, 1, 5))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
    expect(axios).not.toHaveBeenCalled();
  });
});
