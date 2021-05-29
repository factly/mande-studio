import reducer from './tags';
import * as types from '../constants/tags';

const initialState = {
  loading: true,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

describe('tags reducer', () => {
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
  it('should handle SET_TAG_LOADING', () => {
    expect(
      reducer(initialState, {
        type: types.SET_TAG_LOADING,
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
        type: types.SET_TAG_LOADING,
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
  it('should handle ADD_TAG', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_TAG,
        payload: {
          tag: { id: 1, name: 'tag 1' },
        },
      }),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'tag 1' } },
      loading: true,
    });
  });
  it('should handle ADD_TAG when already exists', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          total: 0,
          items: { 1: { id: 1, name: 'existing tag 1' } },
          loading: false,
        },
        {
          type: types.ADD_TAG,
          payload: {
            tag: { id: 1, name: 'updated tag 1' },
          },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'updated tag 1' } },
      loading: false,
    });
  });
  it('should handle ADD_TAGS', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_TAGS,
        payload: {
          tags: { 1: { id: 1, name: 'tag 1' }, 2: { id: 2, name: 'tag 2' } },
        },
      }),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'tag 1' }, 2: { id: 2, name: 'tag 2' } },
      loading: true,
    });
  });
  it('should handle empty payload ADD_TAGS', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_TAGS,
        payload: { tags: {} },
      }),
    ).toEqual({
      loading: true,
      ids: [],
      req: [],
      items: {},
      total: 0,
    });
  });
  it('should handle ADD_TAGS when already exists', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          items: {
            1: { id: 1, name: 'existing tag' },
            2: { id: 2, name: 'new tag' },
          },
          loading: false,
          total: 0,
        },
        {
          type: types.ADD_TAGS,
          payload: { tags: { 2: { id: 2, name: 'updated tag' } } },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      items: {
        1: { id: 1, name: 'existing tag' },
        2: { id: 2, name: 'updated tag' },
      },
      loading: false,
      total: 0,
    });
  });
  it('should handle SET_TAG_IDS', () => {
    expect(
      reducer(initialState, {
        type: types.SET_TAG_IDS,
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
  it('should handle SET_TAG_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.SET_TAG_REQUEST,
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
  it('should handle RESET_TAG', () => {
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
          type: types.RESET_TAG,
        },
      ),
    ).toEqual(initialState);
  });
});
