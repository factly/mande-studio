import reducer from './memberships';
import * as types from '../constants/memberships';

const initialState = {
  loading: true,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

describe('memberships reducer', () => {
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
  it('should handle SET_MEMBERSHIP_LOADING', () => {
    expect(
      reducer(initialState, {
        type: types.SET_MEMBERSHIP_LOADING,
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
        type: types.SET_MEMBERSHIP_LOADING,
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
  it('should handle ADD_MEMBERSHIP', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_MEMBERSHIP,
        payload: {
          membership: { id: 1, name: 'membership 1' },
        },
      }),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'membership 1' } },
      loading: true,
    });
  });
  it('should handle ADD_MEMBERSHIP when already exists', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          total: 0,
          items: { 1: { id: 1, name: 'existing membership 1' } },
          loading: false,
        },
        {
          type: types.ADD_MEMBERSHIP,
          payload: {
            membership: { id: 1, name: 'updated membership 1' },
          },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'updated membership 1' } },
      loading: false,
    });
  });
  it('should handle ADD_MEMBERSHIPS', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_MEMBERSHIPS,
        payload: {
          memberships: { 1: { id: 1, name: 'membership 1' }, 2: { id: 2, name: 'membership 2' } },
        },
      }),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'membership 1' }, 2: { id: 2, name: 'membership 2' } },
      loading: true,
    });
  });
  it('should handle empty payload ADD_MEMBERSHIPS', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_MEMBERSHIPS,
        payload: { memberships: {} },
      }),
    ).toEqual({
      loading: true,
      ids: [],
      req: [],
      items: {},
      total: 0,
    });
  });
  it('should handle ADD_MEMBERSHIPS when already exists', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          items: {
            1: { id: 1, name: 'existing membership' },
            2: { id: 2, name: 'new membership' },
          },
          loading: false,
          total: 0,
        },
        {
          type: types.ADD_MEMBERSHIPS,
          payload: { memberships: { 2: { id: 2, name: 'updated membership' } } },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      items: {
        1: { id: 1, name: 'existing membership' },
        2: { id: 2, name: 'updated membership' },
      },
      loading: false,
      total: 0,
    });
  });
  it('should handle SET_MEMBERSHIP_IDS', () => {
    expect(
      reducer(initialState, {
        type: types.SET_MEMBERSHIP_IDS,
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
  it('should handle SET_MEMBERSHIP_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.SET_MEMBERSHIP_REQUEST,
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
  it('should handle RESET_MEMBERSHIP', () => {
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
          type: types.RESET_MEMBERSHIP,
        },
      ),
    ).toEqual(initialState);
  });
});
