import reducer from './payments';
import * as types from '../constants/payments';

const initialState = {
  loading: true,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

describe('payments reducer', () => {
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
  it('should handle SET_PAYMENT_LOADING', () => {
    expect(
      reducer(initialState, {
        type: types.SET_PAYMENT_LOADING,
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
        type: types.SET_PAYMENT_LOADING,
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
  it('should handle ADD_PAYMENTS', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_PAYMENTS,
        payload: {
          payments: { 1: { id: 1, name: 'payment 1' }, 2: { id: 2, name: 'payment 2' } },
        },
      }),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'payment 1' }, 2: { id: 2, name: 'payment 2' } },
      loading: true,
    });
  });
  it('should handle empty payload ADD_PAYMENTS', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_PAYMENTS,
        payload: { payments: {} },
      }),
    ).toEqual({
      loading: true,
      ids: [],
      req: [],
      items: {},
      total: 0,
    });
  });
  it('should handle ADD_PAYMENTS when already exists', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          items: {
            1: { id: 1, name: 'existing payment' },
            2: { id: 2, name: 'new payment' },
          },
          loading: false,
          total: 0,
        },
        {
          type: types.ADD_PAYMENTS,
          payload: { payments: { 2: { id: 2, name: 'updated payment' } } },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      items: {
        1: { id: 1, name: 'existing payment' },
        2: { id: 2, name: 'updated payment' },
      },
      loading: false,
      total: 0,
    });
  });
  it('should handle SET_PAYMENT_IDS', () => {
    expect(
      reducer(initialState, {
        type: types.SET_PAYMENT_IDS,
        payload: { ids: [1, 2, 3] },
      }),
    ).toEqual({
      req: [],
      items: {},
      ids: [1, 2, 3],
      loading: true,
      total: 0,
    });
  });
  it('should handle SET_PAYMENT_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.SET_PAYMENT_REQUEST,
        payload: {
          req: { ids: [1, 2, 3], page: 1, limit: 5 },
          total: 3,
        },
      }),
    ).toEqual({
      req: [{ ids: [1, 2, 3], page: 1, limit: 5 }],
      items: {},
      ids: [],
      loading: true,
      total: 3,
    });
  });
});
