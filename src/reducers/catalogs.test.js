import reducer from './catalogs';
import * as types from '../constants/catalogs';

const initialState = {
  loading: true,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

describe('catalogs reducer', () => {
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
  it('should handle SET_CATALOG_LOADING', () => {
    expect(
      reducer(initialState, {
        type: types.SET_CATALOG_LOADING,
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
        type: types.SET_CATALOG_LOADING,
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
  it('should handle ADD_CATALOG', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_CATALOG,
        payload: {
          catalog: { id: 1, name: 'catalog 1' },
        },
      }),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'catalog 1' } },
      loading: true,
    });
  });
  it('should handle ADD_CATALOG when already exists', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          total: 0,
          items: { 1: { id: 1, name: 'existing catalog 1' } },
          loading: false,
        },
        {
          type: types.ADD_CATALOG,
          payload: {
            catalog: { id: 1, name: 'updated catalog 1' },
          },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'updated catalog 1' } },
      loading: false,
    });
  });
  it('should handle ADD_CATALOGS', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_CATALOGS,
        payload: {
          catalogs: { 1: { id: 1, name: 'catalog 1' }, 2: { id: 2, name: 'catalog 2' } },
        },
      }),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'catalog 1' }, 2: { id: 2, name: 'catalog 2' } },
      loading: true,
    });
  });
  it('should handle empty payload ADD_CATALOGS', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_CATALOGS,
        payload: { catalogs: {} },
      }),
    ).toEqual({
      loading: true,
      ids: [],
      req: [],
      items: {},
      total: 0,
    });
  });
  it('should handle ADD_CATALOGS when already exists', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          items: {
            1: { id: 1, name: 'existing catalog' },
            2: { id: 2, name: 'new catalog' },
          },
          loading: false,
          total: 0,
        },
        {
          type: types.ADD_CATALOGS,
          payload: { catalogs: { 2: { id: 2, name: 'updated catalog' } } },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      items: {
        1: { id: 1, name: 'existing catalog' },
        2: { id: 2, name: 'updated catalog' },
      },
      loading: false,
      total: 0,
    });
  });
  it('should handle SET_CATALOG_IDS', () => {
    expect(
      reducer(initialState, {
        type: types.SET_CATALOG_IDS,
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
  it('should handle SET_CATALOG_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.SET_CATALOG_REQUEST,
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
  it('should handle RESET_CATALOG', () => {
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
          type: types.RESET_CATALOG,
        },
      ),
    ).toEqual(initialState);
  });
});
