import reducer from './orders';
import * as types from '../constants/orders';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

describe('orders reducer', () => {
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
  it('should handle SET_ORDER_LOADING', () => {
    expect(
      reducer(initialState, {
        type: types.SET_ORDER_LOADING,
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
        type: types.SET_ORDER_LOADING,
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
  it('should handle ADD_ORDER', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_ORDER,
        payload: {
          order: { id: 1, name: 'order 1' },
        },
      }),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'order 1' } },
      loading: false,
    });
  });
  it('should handle ADD_ORDER when already exists', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          total: 0,
          items: { 1: { id: 1, name: 'existing order 1' } },
          loading: false,
        },
        {
          type: types.ADD_ORDER,
          payload: {
            order: { id: 1, name: 'updated order 1' },
          },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'updated order 1' } },
      loading: false,
    });
  });
  it('should handle ADD_ORDERS', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_ORDERS,
        payload: {
          orders: { 1: { id: 1, name: 'order 1' }, 2: { id: 2, name: 'order 2' } },
        },
      }),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'order 1' }, 2: { id: 2, name: 'order 2' } },
      loading: false,
    });
  });
  it('should handle empty payload ADD_ORDERS', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_ORDERS,
        payload: { orders: {} },
      }),
    ).toEqual({
      loading: false,
      ids: [],
      req: [],
      items: {},
      total: 0,
    });
  });
  it('should handle ADD_ORDERS when already exists', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          items: {
            1: { id: 1, name: 'existing order' },
            2: { id: 2, name: 'new order' },
          },
          loading: false,
          total: 0,
        },
        {
          type: types.ADD_ORDERS,
          payload: { orders: { 2: { id: 2, name: 'updated order' } } },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      items: {
        1: { id: 1, name: 'existing order' },
        2: { id: 2, name: 'updated order' },
      },
      loading: false,
      total: 0,
    });
  });
  it('should handle SET_ORDER_IDS', () => {
    expect(
      reducer(initialState, {
        type: types.SET_ORDER_IDS,
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
  it('should handle SET_ORDER_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.SET_ORDER_REQUEST,
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
});
