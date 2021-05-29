import reducer from './cartItems';
import * as types from '../constants/cartItems';

const initialState = {
  loading: true,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

describe('cartItems reducer', () => {
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
  it('should handle SET_CARTITEM_LOADING', () => {
    expect(
      reducer(initialState, {
        type: types.SET_CARTITEM_LOADING,
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
        type: types.SET_CARTITEM_LOADING,
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
  it('should handle ADD_CARTITEMS', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_CARTITEMS,
        payload: {
          cartItems: { 1: { id: 1, name: 'cartItem 1' }, 2: { id: 2, name: 'cartItem 2' } },
        },
      }),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'cartItem 1' }, 2: { id: 2, name: 'cartItem 2' } },
      loading: true,
    });
  });
  it('should handle empty payload ADD_CARTITEMS', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_CARTITEMS,
        payload: { cartItems: {} },
      }),
    ).toEqual({
      loading: true,
      ids: [],
      req: [],
      items: {},
      total: 0,
    });
  });
  it('should handle ADD_CARTITEMS when already exists', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          items: {
            1: { id: 1, name: 'existing cartItem' },
            2: { id: 2, name: 'new cartItem' },
          },
          loading: false,
          total: 0,
        },
        {
          type: types.ADD_CARTITEMS,
          payload: { cartItems: { 2: { id: 2, name: 'updated cartItem' } } },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      items: {
        1: { id: 1, name: 'existing cartItem' },
        2: { id: 2, name: 'updated cartItem' },
      },
      loading: false,
      total: 0,
    });
  });
  it('should handle SET_CARTITEM_IDS', () => {
    expect(
      reducer(initialState, {
        type: types.SET_CARTITEM_IDS,
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
  it('should handle SET_CARTITEM_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.SET_CARTITEM_REQUEST,
        payload: {
          req: { ids: [1, 2, 3], page: 1, limit: 5, id: 1 },
          total: 3,
        },
      }),
    ).toEqual({
      req: [{ ids: [1, 2, 3], page: 1, limit: 5, id: 1 }],
      items: {},
      ids: [],
      loading: true,
      total: 3,
    });
  });
});
