import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import axios from '../utils/axios';
import * as actions from './payments';
import * as types from '../constants/payments';
import { ADD_CURRENCIES } from '../constants/currencies';

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

describe('payments actions', () => {
  it('should create an action to set loading to true', () => {
    const startLoadingAction = {
      type: types.SET_PAYMENT_LOADING,
      payload: { loading: true },
    };
    expect(actions.setLoading(true)).toEqual(startLoadingAction);
  });
  it('should create an action to set loading to false', () => {
    const stopLoadingAction = {
      type: types.SET_PAYMENT_LOADING,
      payload: { loading: false },
    };
    expect(actions.setLoading(false)).toEqual(stopLoadingAction);
  });
  it('should create an action to add payments', () => {
    const data = [{ id: 1, payment: 'Payment 1', currency: { id: 100, currency: 'Currency 1' } }];

    const expectedActions = [
      {
        payload: {
          currencies: { 100: { id: 100, currency: 'Currency 1' } },
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          payments: { 1: { id: 1, payment: 'Payment 1' } },
        },
        type: types.ADD_PAYMENTS,
      },
    ];

    const store = mockStore({ payments: initialState });

    store.dispatch(actions.addPayments(data));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to set request', () => {
    const req = { page: 1, limit: 5, ids: [1, 2, 3, 4, 5] };
    const setRequestAction = {
      type: types.SET_PAYMENT_REQUEST,
      payload: { req, total: 5 },
    };
    expect(actions.setPaymentRequest(req, 5)).toEqual(setRequestAction);
  });
  it('should create an action to set ids', () => {
    const setPaymentIdsRequest = {
      type: types.SET_PAYMENT_IDS,
      payload: { ids: [1, 2, 3] },
    };
    expect(actions.setPaymentIds([1, 2, 3])).toEqual(setPaymentIdsRequest);
  });
  it('should create actions to load payments when req is not in state', () => {
    const payments = [
      { id: 1, payment: 'Payment 1', currency: { id: 100, currency: 'Currency 1' } },
    ];
    const resp = { data: { nodes: payments, total: 1 } };
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_PAYMENT_LOADING,
        payload: { loading: true },
      },
      {
        type: types.SET_PAYMENT_REQUEST,
        payload: { req: { page: 1, limit: 5, ids: [1] }, total: 1 },
      },
      {
        payload: {
          currencies: { 100: { id: 100, currency: 'Currency 1' } },
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          payments: { 1: { id: 1, payment: 'Payment 1' } },
        },
        type: types.ADD_PAYMENTS,
      },
      {
        type: types.SET_PAYMENT_IDS,
        payload: { ids: [1] },
      },
      {
        type: types.SET_PAYMENT_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ payments: initialState });
    store
      .dispatch(actions.loadPayments(1, 5))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
    expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/payments?page=1&limit=5` });
  });
  it('should create actions to load payments with no parameters', () => {
    const payments = [
      { id: 1, payment: 'Payment 1', currency: { id: 100, currency: 'Currency 1' } },
    ];
    const resp = { data: { nodes: payments, total: 1 } };
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_PAYMENT_LOADING,
        payload: { loading: true },
      },
      {
        type: types.SET_PAYMENT_REQUEST,
        payload: { req: { page: 1, limit: 5, ids: [1] }, total: 1 },
      },
      {
        payload: {
          currencies: { 100: { id: 100, currency: 'Currency 1' } },
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          payments: { 1: { id: 1, payment: 'Payment 1' } },
        },
        type: types.ADD_PAYMENTS,
      },
      {
        type: types.SET_PAYMENT_IDS,
        payload: { ids: [1] },
      },
      {
        type: types.SET_PAYMENT_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ payments: initialState });
    store
      .dispatch(actions.loadPayments())
      .then(() => expect(store.getActions()).toEqual(expectedActions));
    expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/payments?page=1&limit=5` });
  });
  it('should create actions to load payments when req is in state', () => {
    const payments = [{ id: 1, name: 'Payment' }];
    const resp = { data: { nodes: payments, total: 1 } };
    axios.mockRestore();
    axios.mockResolvedValue(resp);

    const expectedActions = [
      {
        type: types.SET_PAYMENT_LOADING,
        payload: { loading: true },
      },
      {
        type: types.SET_PAYMENT_REQUEST,
        payload: { req: { page: 1, limit: 5, ids: [1] }, total: 1 },
      },
      {
        payload: {
          currencies: {},
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          payments: { 1: { id: 1, name: 'Payment' } },
        },
        type: types.ADD_PAYMENTS,
      },
      {
        type: types.SET_PAYMENT_IDS,
        payload: { ids: [1] },
      },
      {
        type: types.SET_PAYMENT_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({
      payments: {
        loading: false,
        ids: [],
        req: [{ page: 1, limit: 5, ids: [1] }],
        items: { 1: { id: 1, name: 'Payment' } },
        total: 1,
      },
    });
    store
      .dispatch(actions.loadPayments(1, 5))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
    expect(axios).toHaveBeenCalled();
  });
});
