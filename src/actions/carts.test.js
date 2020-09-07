import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import axios from '../utils/axios';
import * as actions from './carts';
import * as types from '../constants/carts';

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

describe('carts actions', () => {
  it('should create an action to set loading to true', () => {
    const startLoadingAction = {
      type: types.SET_CART_LOADING,
      payload: { loading: true },
    };
    expect(actions.setLoading(true)).toEqual(startLoadingAction);
  });
  it('should create an action to set loading to false', () => {
    const stopLoadingAction = {
      type: types.SET_CART_LOADING,
      payload: { loading: false },
    };
    expect(actions.setLoading(false)).toEqual(stopLoadingAction);
  });
  it('should create an action to add carts', () => {
    const data = [
      { id: 1, cart: 'tester t' },
      { id: 2, cart: 'testing 2' },
    ];

    const expectedActions = [
      {
        type: types.ADD_CARTS,
        payload: {
          carts: {
            1: { id: 1, cart: 'tester t' },
            2: { id: 2, cart: 'testing 2' },
          },
        },
      },
    ];

    const store = mockStore({ carts: initialState });

    store.dispatch(actions.addCarts(data));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to set request', () => {
    const req = { page: 1, limit: 5, ids: [1, 2, 3, 4, 5] };
    const setRequestAction = {
      type: types.SET_CART_REQUEST,
      payload: { req, total: 5 },
    };
    expect(actions.setCartRequest(req, 5)).toEqual(setRequestAction);
  });
  it('should create an action to set ids', () => {
    const setCartIdsRequest = {
      type: types.SET_CART_IDS,
      payload: { ids: [1, 2, 3] },
    };
    expect(actions.setCartIds([1, 2, 3])).toEqual(setCartIdsRequest);
  });
  it('should create actions to load carts when req is not in state', () => {
    const carts = [{ id: 1, name: 'Cart' }];
    const resp = { data: { nodes: carts, total: 1 } };
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_CART_LOADING,
        payload: { loading: true },
      },
      {
        type: types.SET_CART_REQUEST,
        payload: {
          req: { page: 1, limit: 5, ids: [1] },
          total: 1,
        },
      },
      {
        type: types.ADD_CARTS,
        payload: { carts: { 1: { id: 1, name: 'Cart' } } },
      },
      {
        type: types.SET_CART_IDS,
        payload: { ids: [1] },
      },
      {
        type: types.SET_CART_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ carts: initialState });
    store
      .dispatch(actions.loadCarts(1, 5))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
    expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/carts?page=1&limit=5` });
  });
  it('should create actions to load carts when req is in state', () => {
    const carts = [{ id: 1, name: 'Cart' }];
    const resp = { data: { nodes: carts, total: 1 } };
    axios.mockRestore();
    axios.mockResolvedValue(resp);

    const expectedActions = [
      {
        type: types.SET_CART_IDS,
        payload: { ids: [1] },
      },
    ];

    const store = mockStore({
      carts: {
        loading: false,
        ids: [],
        req: [{ page: 1, limit: 5, ids: [1] }],
        items: { 1: { id: 1, name: 'Cart' } },
        total: 1,
      },
    });
    store
      .dispatch(actions.loadCarts(1, 5))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
    expect(axios).not.toHaveBeenCalled();
  });
});
