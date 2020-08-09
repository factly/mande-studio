import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import axios from '../utils/axios';
import * as actions from './memberships';
import * as types from '../constants/memberships';
import { ADD_PLANS } from '../constants/plans';
import { ADD_CURRENCIES } from '../constants/currencies';
import { ADD_PAYMENTS } from '../constants/payments';
import { SET_USERS } from '../constants/users';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../utils/axios', () => jest.fn());

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

describe('memberships actions', () => {
  it('should create an action to set loading to true', () => {
    const startLoadingAction = {
      type: types.SET_MEMBERSHIP_LOADING,
      payload: { loading: true },
    };
    expect(actions.setLoading(true)).toEqual(startLoadingAction);
  });
  it('should create an action to set loading to false', () => {
    const stopLoadingAction = {
      type: types.SET_MEMBERSHIP_LOADING,
      payload: { loading: false },
    };
    expect(actions.setLoading(false)).toEqual(stopLoadingAction);
  });
  it('should create an action to add memberships with payment, plan and user', () => {
    const data = [
      {
        id: 1,
        membership: 'tester 1',
        payment: { id: 11, payment: 'Payment 1', currency: { id: 100, currency: 'Currency 1' } },
        plan: { id: 110, plan: 'Plan 1' },
        user: { id: 120, user: 'User 1' },
      },
      {
        id: 2,
        membership: 'testing 2',
        plan: { id: 210, plan: 'Plan 2' },
        user: { id: 220, user: 'User 2' },
      },
    ];

    const expectedActions = [
      {
        payload: {
          currencies: { 100: { id: 100, currency: 'Currency 1' } },
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          payments: { 11: { id: 11, payment: 'Payment 1' } },
        },
        type: ADD_PAYMENTS,
      },
      {
        payload: {
          plans: { 110: { id: 110, plan: 'Plan 1' }, 210: { id: 210, plan: 'Plan 2' } },
        },
        type: ADD_PLANS,
      },
      {
        payload: {
          ids: [120, 220],
          items: { 120: { id: 120, user: 'User 1' }, 220: { id: 220, user: 'User 2' } },
        },
        type: SET_USERS,
      },
      {
        type: types.ADD_MEMBERSHIPS,
        payload: {
          memberships: {
            1: { id: 1, membership: 'tester 1' },
            2: { id: 2, membership: 'testing 2' },
          },
        },
      },
    ];

    const store = mockStore({ memberships: initialState });

    store.dispatch(actions.addMemberships(data));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add memberships without payment, plan and user', () => {
    const data = [
      { id: 1, membership: 'tester 1' },
      { id: 2, membership: 'testing 2' },
    ];

    const expectedActions = [
      {
        payload: {
          currencies: {},
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          payments: {},
        },
        type: ADD_PAYMENTS,
      },
      {
        payload: {
          plans: {},
        },
        type: ADD_PLANS,
      },
      {
        payload: {
          ids: [],
          items: {},
        },
        type: SET_USERS,
      },
      {
        type: types.ADD_MEMBERSHIPS,
        payload: {
          memberships: {
            1: { id: 1, membership: 'tester 1' },
            2: { id: 2, membership: 'testing 2' },
          },
        },
      },
    ];

    const store = mockStore({ memberships: initialState });

    store.dispatch(actions.addMemberships(data));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to set request', () => {
    const req = { page: 1, limit: 5, ids: [1, 2, 3, 4, 5] };
    const setRequestAction = {
      type: types.SET_MEMBERSHIP_REQUEST,
      payload: { req, total: 5 },
    };
    expect(actions.setMembershipRequest(req, 5)).toEqual(setRequestAction);
  });
  it('should create an action to set ids', () => {
    const setMembershipIdsRequest = {
      type: types.SET_MEMBERSHIP_IDS,
      payload: { ids: [1, 2, 3] },
    };
    expect(actions.setMembershipIds([1, 2, 3])).toEqual(setMembershipIdsRequest);
  });
  it('should create actions to load memberships when req is not in state', () => {
    const memberships = [
      {
        id: 1,
        membership: 'tester 1',
        payment: { id: 11, payment: 'Payment 1', currency: { id: 100, currency: 'Currency 1' } },
        plan: { id: 110, plan: 'Plan 1' },
        user: { id: 120, user: 'User 1' },
      },
    ];
    const resp = { data: { nodes: memberships, total: 1 } };
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_MEMBERSHIP_LOADING,
        payload: { loading: true },
      },
      {
        type: types.SET_MEMBERSHIP_REQUEST,
        payload: { req: { page: 1, limit: 5, ids: [1] }, total: 1 },
      },
      {
        payload: {
          currencies: { 100: { id: 100, currency: 'Currency 1' } },
        },
        type: ADD_CURRENCIES,
      },
      {
        payload: {
          payments: { 11: { id: 11, payment: 'Payment 1' } },
        },
        type: ADD_PAYMENTS,
      },
      {
        payload: {
          plans: { 110: { id: 110, plan: 'Plan 1' } },
        },
        type: ADD_PLANS,
      },
      {
        payload: {
          ids: [120],
          items: { 120: { id: 120, user: 'User 1' } },
        },
        type: SET_USERS,
      },
      {
        type: types.ADD_MEMBERSHIPS,
        payload: {
          memberships: {
            1: { id: 1, membership: 'tester 1' },
          },
        },
      },
      {
        type: types.SET_MEMBERSHIP_IDS,
        payload: { ids: [1] },
      },
      {
        type: types.SET_MEMBERSHIP_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ memberships: initialState });
    store
      .dispatch(actions.loadMemberships(1, 5))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
    expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/memberships?page=1&limit=5` });
  });
  it('should create actions to load memberships when req is in state', () => {
    const memberships = [{ id: 1, name: 'Membership' }];
    const resp = { data: { nodes: memberships, total: 1 } };
    axios.mockRestore();
    axios.mockResolvedValue(resp);

    const expectedActions = [
      {
        type: types.SET_MEMBERSHIP_IDS,
        payload: { ids: [1] },
      },
    ];

    const store = mockStore({
      memberships: {
        loading: false,
        ids: [],
        req: [{ page: 1, limit: 5, ids: [1] }],
        items: { 1: { id: 1, name: 'Membership' } },
        total: 1,
      },
    });
    store
      .dispatch(actions.loadMemberships(1, 5))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
    expect(axios).not.toHaveBeenCalled();
  });
});
