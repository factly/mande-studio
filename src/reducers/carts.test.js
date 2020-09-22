import reducer from './carts';
import * as types from '../constants/carts';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

describe('carts reducer', () => {
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
  it('should handle SET_CART_LOADING', () => {
    expect(
      reducer(initialState, {
        type: types.SET_CART_LOADING,
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
        type: types.SET_CART_LOADING,
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
  it('should handle ADD_CARTS', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_CARTS,
        payload: {
          carts: { 1: { id: 1, name: 'cart 1' }, 2: { id: 2, name: 'cart 2' } },
        },
      }),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'cart 1' }, 2: { id: 2, name: 'cart 2' } },
      loading: false,
    });
  });
  it('should handle empty payload ADD_CARTS', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_CARTS,
        payload: { carts: {} },
      }),
    ).toEqual({
      loading: false,
      ids: [],
      req: [],
      items: {},
      total: 0,
    });
  });
  it('should handle ADD_CARTS when already exists', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          items: {
            1: { id: 1, name: 'existing cart' },
            2: { id: 2, name: 'new cart' },
          },
          loading: false,
          total: 0,
        },
        {
          type: types.ADD_CARTS,
          payload: { carts: { 2: { id: 2, name: 'updated cart' } } },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      items: {
        1: { id: 1, name: 'existing cart' },
        2: { id: 2, name: 'updated cart' },
      },
      loading: false,
      total: 0,
    });
  });
  it('should handle SET_CART_IDS', () => {
    expect(
      reducer(initialState, {
        type: types.SET_CART_IDS,
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
  it('should handle SET_CART_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.SET_CART_REQUEST,
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
