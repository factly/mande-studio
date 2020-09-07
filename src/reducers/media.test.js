import reducer from './media';
import * as types from '../constants/media';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

describe('media reducer', () => {
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
  it('should handle SET_MEDIUM_LOADING', () => {
    expect(
      reducer(initialState, {
        type: types.SET_MEDIUM_LOADING,
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
        type: types.SET_MEDIUM_LOADING,
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
  it('should handle ADD_MEDIUM', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_MEDIUM,
        payload: {
          medium: { id: 1, name: 'medium 1' },
        },
      }),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'medium 1' } },
      loading: false,
    });
  });
  it('should handle ADD_MEDIUM when already exists', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          total: 0,
          items: { 1: { id: 1, name: 'existing medium 1' } },
          loading: false,
        },
        {
          type: types.ADD_MEDIUM,
          payload: {
            medium: { id: 1, name: 'updated medium 1' },
          },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'updated medium 1' } },
      loading: false,
    });
  });
  it('should handle ADD_MEDIA', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_MEDIA,
        payload: {
          media: { 1: { id: 1, name: 'medium 1' }, 2: { id: 2, name: 'medium 2' } },
        },
      }),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'medium 1' }, 2: { id: 2, name: 'medium 2' } },
      loading: false,
    });
  });
  it('should handle empty payload ADD_MEDIA', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_MEDIA,
        payload: { media: {} },
      }),
    ).toEqual({
      loading: false,
      ids: [],
      req: [],
      items: {},
      total: 0,
    });
  });
  it('should handle ADD_MEDIA when already exists', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          items: {
            1: { id: 1, name: 'existing medium' },
            2: { id: 2, name: 'new medium' },
          },
          loading: false,
          total: 0,
        },
        {
          type: types.ADD_MEDIA,
          payload: { media: { 2: { id: 2, name: 'updated medium' } } },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      items: {
        1: { id: 1, name: 'existing medium' },
        2: { id: 2, name: 'updated medium' },
      },
      loading: false,
      total: 0,
    });
  });
  it('should handle SET_MEDIUM_IDS', () => {
    expect(
      reducer(initialState, {
        type: types.SET_MEDIUM_IDS,
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
  it('should handle SET_MEDIUM_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.SET_MEDIUM_REQUEST,
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
  it('should handle RESET_MEDIUM', () => {
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
          type: types.RESET_MEDIUM,
        },
      ),
    ).toEqual(initialState);
  });
});
