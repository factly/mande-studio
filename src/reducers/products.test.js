import reducer from './products';
import * as types from '../constants/products';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

describe('products reducer', () => {
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
  it('should handle SET_PRODUCT_LOADING', () => {
    expect(
      reducer(initialState, {
        type: types.SET_PRODUCT_LOADING,
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
        type: types.SET_PRODUCT_LOADING,
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
  it('should handle ADD_PRODUCT', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_PRODUCT,
        payload: {
          product: { id: 1, name: 'product 1' },
        },
      }),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'product 1' } },
      loading: false,
    });
  });
  it('should handle ADD_PRODUCT when already exists', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          total: 0,
          items: { 1: { id: 1, name: 'existing product 1' } },
          loading: false,
        },
        {
          type: types.ADD_PRODUCT,
          payload: {
            product: { id: 1, name: 'updated product 1' },
          },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'updated product 1' } },
      loading: false,
    });
  });
  it('should handle ADD_PRODUCTS', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_PRODUCTS,
        payload: {
          products: { 1: { id: 1, name: 'product 1' }, 2: { id: 2, name: 'product 2' } },
        },
      }),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'product 1' }, 2: { id: 2, name: 'product 2' } },
      loading: false,
    });
  });
  it('should handle empty payload ADD_PRODUCTS', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_PRODUCTS,
        payload: { products: {} },
      }),
    ).toEqual({
      loading: false,
      ids: [],
      req: [],
      items: {},
      total: 0,
    });
  });
  it('should handle ADD_PRODUCTS when already exists', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          items: {
            1: { id: 1, name: 'existing product' },
            2: { id: 2, name: 'new product' },
          },
          loading: false,
          total: 0,
        },
        {
          type: types.ADD_PRODUCTS,
          payload: { products: { 2: { id: 2, name: 'updated product' } } },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      items: {
        1: { id: 1, name: 'existing product' },
        2: { id: 2, name: 'updated product' },
      },
      loading: false,
      total: 0,
    });
  });
  it('should handle SET_PRODUCT_IDS', () => {
    expect(
      reducer(initialState, {
        type: types.SET_PRODUCT_IDS,
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
  it('should handle SET_PRODUCT_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.SET_PRODUCT_REQUEST,
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
  it('should handle RESET_PRODUCT', () => {
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
          type: types.RESET_PRODUCT,
        },
      ),
    ).toEqual(initialState);
  });
});
