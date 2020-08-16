import reducer from './currencies';
import * as types from '../constants/currencies';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

describe('currencies reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should return the state for default case', () => {
    expect(
      reducer({
        req: [{ ids: [1, 2, 3], page: 1, limit: 5 }],
        items: { 1: { id: 1, name: 'entity' } },
        ids: [1, 2, 3],
        loading: false,
        total: 3,
      }),
    ).toEqual({
      req: [{ ids: [1, 2, 3], page: 1, limit: 5 }],
      items: { 1: { id: 1, name: 'entity' } },
      ids: [1, 2, 3],
      loading: false,
      total: 3,
    });
  });
  it('should handle SET_CURRENCY_LOADING', () => {
    expect(
      reducer(initialState, {
        type: types.SET_CURRENCY_LOADING,
        payload: { loading: true },
      }),
    ).toEqual({
      loading: true,
      ids: [],
      req: [],
      items: {},
      total: 0,
    });
    expect(
      reducer(initialState, {
        type: types.SET_CURRENCY_LOADING,
        payload: { loading: false },
      }),
    ).toEqual({
      loading: false,
      ids: [],
      req: [],
      items: {},
      total: 0,
    });
  });
  it('should handle ADD_CURRENCY', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_CURRENCY,
        payload: {
          currency: { id: 1, name: 'currency 1' },
        },
      }),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'currency 1' } },
      loading: false,
    });
  });
  it('should handle ADD_CURRENCY when already exists', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          total: 0,
          items: { 1: { id: 1, name: 'existing currency 1' } },
          loading: false,
        },
        {
          type: types.ADD_CURRENCY,
          payload: {
            currency: { id: 1, name: 'updated currency 1' },
          },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'updated currency 1' } },
      loading: false,
    });
  });
  it('should handle ADD_CURRENCIES', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_CURRENCIES,
        payload: {
          currencies: { 1: { id: 1, name: 'currency 1' }, 2: { id: 2, name: 'currency 2' } },
        },
      }),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'currency 1' }, 2: { id: 2, name: 'currency 2' } },
      loading: false,
    });
  });
  it('should handle empty payload ADD_CURRENCIES', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_CURRENCIES,
        payload: { currencies: {} },
      }),
    ).toEqual({
      loading: false,
      ids: [],
      req: [],
      items: {},
      total: 0,
    });
  });
  it('should handle ADD_CURRENCIES when already exists', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          items: {
            1: { id: 1, name: 'existing currency' },
            2: { id: 2, name: 'new currency' },
          },
          loading: false,
          total: 0,
        },
        {
          type: types.ADD_CURRENCIES,
          payload: { currencies: { 2: { id: 2, name: 'updated currency' } } },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      items: {
        1: { id: 1, name: 'existing currency' },
        2: { id: 2, name: 'updated currency' },
      },
      loading: false,
      total: 0,
    });
  });
  it('should handle SET_CURRENCY_IDS', () => {
    expect(
      reducer(initialState, {
        type: types.SET_CURRENCY_IDS,
        payload: { ids: [1, 2, 3] },
      }),
    ).toEqual({
      req: [],
      items: {},
      ids: [1, 2, 3],
      loading: false,
      total: 0,
    });
  });
  it('should handle SET_CURRENCY_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.SET_CURRENCY_REQUEST,
        payload: {
          req: { ids: [1, 2, 3], page: 1, limit: 5 },
          total: 3,
        },
      }),
    ).toEqual({
      req: [{ ids: [1, 2, 3], page: 1, limit: 5 }],
      items: {},
      ids: [],
      loading: false,
      total: 3,
    });
  });
  it('should handle RESET_CURRENCY', () => {
    expect(
      reducer(
        {
          req: [{ ids: [1, 2, 3], page: 1, limit: 5 }],
          items: { 1: { id: 1, name: 'entity' } },
          ids: [1, 2, 3],
          loading: false,
          total: 3,
        },
        {
          type: types.RESET_CURRENCY,
        },
      ),
    ).toEqual(initialState);
  });
});
