import reducer from './formats';
import * as types from '../constants/formats';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

describe('formats reducer', () => {
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
  it('should handle SET_FORMAT_LOADING', () => {
    expect(
      reducer(initialState, {
        type: types.SET_FORMAT_LOADING,
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
        type: types.SET_FORMAT_LOADING,
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
  it('should handle ADD_FORMAT', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_FORMAT,
        payload: {
          format: { id: 1, name: 'format 1' },
        },
      }),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'format 1' } },
      loading: false,
    });
  });
  it('should handle ADD_FORMAT when already exists', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          total: 0,
          items: { 1: { id: 1, name: 'existing format 1' } },
          loading: false,
        },
        {
          type: types.ADD_FORMAT,
          payload: {
            format: { id: 1, name: 'updated format 1' },
          },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'updated format 1' } },
      loading: false,
    });
  });
  it('should handle ADD_FORMATS', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_FORMATS,
        payload: {
          formats: { 1: { id: 1, name: 'format 1' }, 2: { id: 2, name: 'format 2' } },
        },
      }),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'format 1' }, 2: { id: 2, name: 'format 2' } },
      loading: false,
    });
  });
  it('should handle empty payload ADD_FORMATS', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_FORMATS,
        payload: { formats: {} },
      }),
    ).toEqual({
      loading: false,
      ids: [],
      req: [],
      items: {},
      total: 0,
    });
  });
  it('should handle ADD_FORMATS when already exists', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          items: {
            1: { id: 1, name: 'existing format' },
            2: { id: 2, name: 'new format' },
          },
          loading: false,
          total: 0,
        },
        {
          type: types.ADD_FORMATS,
          payload: { formats: { 2: { id: 2, name: 'updated format' } } },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      items: {
        1: { id: 1, name: 'existing format' },
        2: { id: 2, name: 'updated format' },
      },
      loading: false,
      total: 0,
    });
  });
  it('should handle SET_FORMAT_IDS', () => {
    expect(
      reducer(initialState, {
        type: types.SET_FORMAT_IDS,
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
  it('should handle SET_FORMAT_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.SET_FORMAT_REQUEST,
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
  it('should handle RESET_FORMAT', () => {
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
          type: types.RESET_FORMAT,
        },
      ),
    ).toEqual(initialState);
  });
});
