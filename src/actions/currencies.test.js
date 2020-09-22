import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import axios from '../utils/axios';
import * as actions from './currencies';
import * as types from '../constants/currencies';

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

describe('currencies actions', () => {
  it('should create an action to set loading to true', () => {
    const startLoadingAction = {
      type: types.SET_CURRENCY_LOADING,
      payload: { loading: true },
    };
    expect(actions.setLoading(true)).toEqual(startLoadingAction);
  });
  it('should create an action to set loading to false', () => {
    const stopLoadingAction = {
      type: types.SET_CURRENCY_LOADING,
      payload: { loading: false },
    };
    expect(actions.setLoading(false)).toEqual(stopLoadingAction);
  });
  it('should create an action to add single currency', () => {
    const currency = { id: 1, currency: 'tester 1' };

    const expectedActions = [
      {
        type: types.ADD_CURRENCY,
        payload: {
          currency: { id: 1, currency: 'tester 1' },
        },
      },
    ];

    const store = mockStore({ currencies: initialState });

    store.dispatch(actions.addCurrency(currency));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add currencies without products', () => {
    const data = [
      { id: 1, currency: 'tester 1' },
      { id: 2, currency: 'testing 2' },
    ];

    const expectedActions = [
      {
        type: types.ADD_CURRENCIES,
        payload: {
          currencies: {
            1: { id: 1, currency: 'tester 1' },
            2: { id: 2, currency: 'testing 2' },
          },
        },
      },
    ];

    const store = mockStore({ currencies: initialState });

    store.dispatch(actions.addCurrencies(data));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add currencies request', () => {
    const req = { page: 1, limit: 5, ids: [1, 2, 3, 4, 5] };
    const addCurrenciesRequestAction = {
      type: types.SET_CURRENCY_REQUEST,
      payload: { req, total: 5 },
    };
    expect(actions.setCurrencyRequest(req, 5)).toEqual(addCurrenciesRequestAction);
  });
  it('should create an action to set ids', () => {
    const setCatalgoIdsRequest = {
      type: types.SET_CURRENCY_IDS,
      payload: { ids: [1, 2, 3] },
    };
    expect(actions.setCurrencyIds([1, 2, 3])).toEqual(setCatalgoIdsRequest);
  });
  it('should create an action to reset currencies', () => {
    const resetCurrencyRequest = {
      type: types.RESET_CURRENCY,
    };
    expect(actions.resetCurrency()).toEqual(resetCurrencyRequest);
  });
  it('should create actions to load currencies when req is not in state', () => {
    const currencies = [{ id: 1, name: 'Currency' }];
    const resp = { data: { nodes: currencies, total: 1 } };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_CURRENCY_LOADING,
        payload: { loading: true },
      },
      {
        type: types.SET_CURRENCY_REQUEST,
        payload: {
          req: { page: 1, limit: 5, ids: [1] },
          total: 1,
        },
      },
      {
        type: types.ADD_CURRENCIES,
        payload: { currencies: { 1: { id: 1, name: 'Currency' } } },
      },
      {
        type: types.SET_CURRENCY_IDS,
        payload: { ids: [1] },
      },
      {
        type: types.SET_CURRENCY_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ currencies: initialState });
    store
      .dispatch(actions.loadCurrencies(1, 5))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/currencies?page=1&limit=5` });
      });
  });
  it('should create actions to load currencies when req is in state', () => {
    axios.mockRestore();
    const expectedActions = [
      {
        type: types.SET_CURRENCY_IDS,
        payload: { ids: [1] },
      },
    ];

    const store = mockStore({
      currencies: {
        loading: false,
        ids: [],
        req: [{ page: 1, limit: 5, ids: [1] }],
        items: { 1: { id: 1, name: 'Currency' } },
        total: 1,
      },
    });
    store.dispatch(actions.loadCurrencies(1, 5));
    expect(store.getActions()).toEqual(expectedActions);
    expect(axios).not.toHaveBeenCalled();
  });
  it('should create actions to create currency', () => {
    const currency = { name: 'Currency' };
    const resp = { data: currency };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_CURRENCY_LOADING,
        payload: { loading: true },
      },
      {
        type: types.RESET_CURRENCY,
      },
      {
        type: types.SET_CURRENCY_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ currencies: initialState });
    store
      .dispatch(actions.createCurrency(currency))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'post', url: `/currencies`, data: currency });
      });
  });
  it('should create actions to update currency without product', () => {
    const currency = { id: 1, currency: 'tester 1' };
    const resp = { data: currency };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_CURRENCY_LOADING,
        payload: { loading: true },
      },
      {
        type: types.ADD_CURRENCY,
        payload: {
          currency: { id: 1, currency: 'tester 1' },
        },
      },
      {
        type: types.SET_CURRENCY_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ currencies: initialState });
    store
      .dispatch(actions.updateCurrency(1, currency))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'put', url: `/currencies/1`, data: currency });
      });
  });
  it('should create actions to delete currency success', () => {
    axios.mockRestore();
    axios.mockResolvedValueOnce();

    const expectedActions = [
      {
        type: types.SET_CURRENCY_LOADING,
        payload: { loading: true },
      },
      {
        type: types.RESET_CURRENCY,
      },
      {
        type: types.SET_CURRENCY_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ currencies: initialState });
    store
      .dispatch(actions.deleteCurrency(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'delete', url: `/currencies/1` });
      });
  });
  it('should create actions to get currency by id when currency is in state', () => {
    axios.mockRestore();
    const store = mockStore({
      currencies: {
        loading: false,
        ids: [],
        req: [{ page: 1, limit: 5, ids: [1] }],
        items: { 1: { id: 1, name: 'Currency' } },
        total: 1,
      },
    });
    store
      .dispatch(actions.getCurrency(1))
      .then(() => {
        expect(store.getActions()).toEqual([]);
      })
      .then(() => {
        expect(axios).not.toHaveBeenCalled();
      });
  });
  it('should create actions to get currency by id when currency is not in state', () => {
    const id = 1;
    const currency = { id, name: 'Currency' };
    const resp = { data: currency };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_CURRENCY_LOADING,
        payload: { loading: true },
      },
      {
        type: types.ADD_CURRENCY,
        payload: { currency: { id, name: 'Currency' } },
      },
      {
        type: types.SET_CURRENCY_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ currencies: initialState });
    store
      .dispatch(actions.getCurrency(id))
      .then(() => expect(store.getActions()).toEqual(expectedActions))
      .then(() => expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/currencies/1` }));
  });
});
