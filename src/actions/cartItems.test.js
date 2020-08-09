import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import axios from '../utils/axios';
import * as actions from './cartItems';
import * as types from '../constants/cartItems';
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

describe('cartItems actions', () => {
  it('should create an action to set loading to true', () => {
    const startLoadingAction = {
      type: types.SET_CARTITEM_LOADING,
      payload: { loading: true },
    };
    expect(actions.setLoading(true)).toEqual(startLoadingAction);
  });
  it('should create an action to set loading to false', () => {
    const stopLoadingAction = {
      type: types.SET_CARTITEM_LOADING,
      payload: { loading: false },
    };
    expect(actions.setLoading(false)).toEqual(stopLoadingAction);
  });
  it('should create an action to add cartItems with products', () => {
    const data = [
      { id: 1, cartItem: 'tester t', product: { id: 11, product: 'Product 1' } },
      { id: 2, cartItem: 'testing 2', product: { id: 22, product: 'Product 2' } },
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
        type: types.ADD_CARTITEMS,
        payload: {
          cartItems: {
            1: { id: 1, cartItem: 'tester t' },
            2: { id: 2, cartItem: 'testing 2' },
          },
        },
      },
    ];

    const store = mockStore({ cartItems: initialState });
    store.dispatch(actions.addCartItems(data));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add cartItems without products', () => {
    const data = [
      { id: 1, cartItem: 'tester t' },
      { id: 2, cartItem: 'testing 2' },
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
        type: types.ADD_CARTITEMS,
        payload: {
          cartItems: {
            1: { id: 1, cartItem: 'tester t' },
            2: { id: 2, cartItem: 'testing 2' },
          },
        },
      },
    ];

    const store = mockStore({ cartItems: initialState });

    store.dispatch(actions.addCartItems(data));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to set request', () => {
    const req = { id: 1, page: 1, limit: 5, ids: [1, 2, 3, 4, 5] };
    const setRequestAction = {
      type: types.SET_CARTITEM_REQUEST,
      payload: { req, total: 5 },
    };
    expect(actions.setCartItemRequest(req, 5)).toEqual(setRequestAction);
  });
  it('should create an action to set ids', () => {
    const setCartItemIdsRequest = {
      type: types.SET_CARTITEM_IDS,
      payload: { ids: [1, 2, 3] },
    };
    expect(actions.setCartItemIds([1, 2, 3])).toEqual(setCartItemIdsRequest);
  });
  it('should create actions to load cartItems when req is not in state', () => {
    const cartItems = [{ id: 1, name: 'CartItem' }];
    const resp = { data: { nodes: cartItems, total: 1 } };
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_CARTITEM_LOADING,
        payload: { loading: true },
      },
      {
        type: types.SET_CARTITEM_REQUEST,
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
        type: types.ADD_CARTITEMS,
        payload: { cartItems: { 1: { id: 1, name: 'CartItem' } } },
      },
      {
        type: types.SET_CARTITEM_IDS,
        payload: { ids: [1] },
      },
      {
        type: types.SET_CARTITEM_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ cartItems: initialState });
    store
      .dispatch(actions.loadCartItems(1, 1, 5))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
    expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/carts/1/items?page=1&limit=5` });
  });
  it('should create actions to load cartItems when req is in state', () => {
    const cartItems = [{ id: 1, name: 'CartItem' }];
    const resp = { data: { nodes: cartItems, total: 1 } };
    axios.mockRestore();
    axios.mockResolvedValue(resp);

    const expectedActions = [
      {
        type: types.SET_CARTITEM_IDS,
        payload: { ids: [1] },
      },
    ];

    const store = mockStore({
      cartItems: {
        loading: false,
        ids: [],
        req: [{ id: 1, page: 1, limit: 5, ids: [1] }],
        items: { 1: { id: 1, name: 'CartItem' } },
        total: 1,
      },
    });
    store
      .dispatch(actions.loadCartItems(1, 1, 5))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
    expect(axios).not.toHaveBeenCalled();
  });
});
