import reducer from './plans';
import * as types from '../constants/plans';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

describe('plans reducer', () => {
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
  it('should handle SET_PLAN_LOADING', () => {
    expect(
      reducer(initialState, {
        type: types.SET_PLAN_LOADING,
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
        type: types.SET_PLAN_LOADING,
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
  it('should handle ADD_PLAN', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_PLAN,
        payload: {
          plan: { id: 1, name: 'plan 1' },
        },
      }),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'plan 1' } },
      loading: false,
    });
  });
  it('should handle ADD_PLAN when already exists', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          total: 0,
          items: { 1: { id: 1, name: 'existing plan 1' } },
          loading: false,
        },
        {
          type: types.ADD_PLAN,
          payload: {
            plan: { id: 1, name: 'updated plan 1' },
          },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'updated plan 1' } },
      loading: false,
    });
  });
  it('should handle ADD_PLANS', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_PLANS,
        payload: {
          plans: { 1: { id: 1, name: 'plan 1' }, 2: { id: 2, name: 'plan 2' } },
        },
      }),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'plan 1' }, 2: { id: 2, name: 'plan 2' } },
      loading: false,
    });
  });
  it('should handle empty payload ADD_PLANS', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_PLANS,
        payload: { plans: {} },
      }),
    ).toEqual({
      loading: false,
      ids: [],
      req: [],
      items: {},
      total: 0,
    });
  });
  it('should handle ADD_PLANS when already exists', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          items: {
            1: { id: 1, name: 'existing plan' },
            2: { id: 2, name: 'new plan' },
          },
          loading: false,
          total: 0,
        },
        {
          type: types.ADD_PLANS,
          payload: { plans: { 2: { id: 2, name: 'updated plan' } } },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      items: {
        1: { id: 1, name: 'existing plan' },
        2: { id: 2, name: 'updated plan' },
      },
      loading: false,
      total: 0,
    });
  });
  it('should handle SET_PLAN_IDS', () => {
    expect(
      reducer(initialState, {
        type: types.SET_PLAN_IDS,
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
  it('should handle SET_PLAN_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.SET_PLAN_REQUEST,
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
  it('should handle RESET_PLAN', () => {
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
          type: types.RESET_PLAN,
        },
      ),
    ).toEqual(initialState);
  });
});
