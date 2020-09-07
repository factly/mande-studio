import reducer from './orderItems';
import * as types from '../constants/orderItems';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

describe('orderItems reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should return the state for default case', () => {
    expect(
      reducer({
        req: [{ ids: [1, 2, 3], page: 1, limit: 5, id: 1 }],
        items: { 1: { id: 1, name: 'entity' } },
        ids: [1, 2, 3],
        loading: false,
        total: 3,
      }),
    ).toEqual({
      req: [{ ids: [1, 2, 3], page: 1, limit: 5, id: 1 }],
      items: { 1: { id: 1, name: 'entity' } },
      ids: [1, 2, 3],
      loading: false,
      total: 3,
    });
  });
  it('should handle SET_ORDERITEM_LOADING', () => {
    expect(
      reducer(initialState, {
        type: types.SET_ORDERITEM_LOADING,
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
        type: types.SET_ORDERITEM_LOADING,
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
  it('should handle ADD_ORDERITEMS', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_ORDERITEMS,
        payload: {
          orderItems: { 1: { id: 1, name: 'orderItem 1' }, 2: { id: 2, name: 'orderItem 2' } },
        },
      }),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'orderItem 1' }, 2: { id: 2, name: 'orderItem 2' } },
      loading: false,
    });
  });
  it('should handle empty payload ADD_ORDERITEMS', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_ORDERITEMS,
        payload: { orderItems: {} },
      }),
    ).toEqual({
      loading: false,
      ids: [],
      req: [],
      items: {},
      total: 0,
    });
  });
  it('should handle ADD_ORDERITEMS when already exists', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          items: {
            1: { id: 1, name: 'existing orderItem' },
            2: { id: 2, name: 'new orderItem' },
          },
          loading: false,
          total: 0,
        },
        {
          type: types.ADD_ORDERITEMS,
          payload: { orderItems: { 2: { id: 2, name: 'updated orderItem' } } },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      items: {
        1: { id: 1, name: 'existing orderItem' },
        2: { id: 2, name: 'updated orderItem' },
      },
      loading: false,
      total: 0,
    });
  });
  it('should handle SET_ORDERITEM_IDS', () => {
    expect(
      reducer(initialState, {
        type: types.SET_ORDERITEM_IDS,
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
  it('should handle SET_ORDERITEM_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.SET_ORDERITEM_REQUEST,
        payload: {
          req: { ids: [1, 2, 3], page: 1, limit: 5, id: 1 },
          total: 3,
        },
      }),
    ).toEqual({
      req: [{ ids: [1, 2, 3], page: 1, limit: 5, id: 1 }],
      items: {},
      ids: [],
      loading: false,
      total: 3,
    });
  });
});
