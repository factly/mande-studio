import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import axios from '../utils/axios';
import * as actions from './plans';
import * as types from '../constants/plans';

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

describe('plans actions', () => {
  it('should create an action to set loading to true', () => {
    const startLoadingAction = {
      type: types.SET_PLAN_LOADING,
      payload: { loading: true },
    };
    expect(actions.setLoading(true)).toEqual(startLoadingAction);
  });
  it('should create an action to set loading to false', () => {
    const stopLoadingAction = {
      type: types.SET_PLAN_LOADING,
      payload: { loading: false },
    };
    expect(actions.setLoading(false)).toEqual(stopLoadingAction);
  });
  it('should create an action to add single plan', () => {
    const plan = { id: 1, plan: 'tester 1' };

    const expectedActions = [
      {
        type: types.ADD_PLAN,
        payload: {
          plan: { id: 1, plan: 'tester 1' },
        },
      },
    ];

    const store = mockStore({ plans: initialState });

    store.dispatch(actions.addPlan(plan));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add plans without products', () => {
    const data = [
      { id: 1, plan: 'tester 1' },
      { id: 2, plan: 'testing 2' },
    ];

    const expectedActions = [
      {
        type: types.ADD_PLANS,
        payload: {
          plans: {
            1: { id: 1, plan: 'tester 1' },
            2: { id: 2, plan: 'testing 2' },
          },
        },
      },
    ];

    const store = mockStore({ plans: initialState });

    store.dispatch(actions.addPlans(data));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add plans request', () => {
    const req = { page: 1, limit: 5, ids: [1, 2, 3, 4, 5] };
    const addPlansRequestAction = {
      type: types.SET_PLAN_REQUEST,
      payload: { req, total: 5 },
    };
    expect(actions.setPlanRequest(req, 5)).toEqual(addPlansRequestAction);
  });
  it('should create an action to set ids', () => {
    const setCatalgoIdsRequest = {
      type: types.SET_PLAN_IDS,
      payload: { ids: [1, 2, 3] },
    };
    expect(actions.setPlanIds([1, 2, 3])).toEqual(setCatalgoIdsRequest);
  });
  it('should create an action to reset plans', () => {
    const resetPlanRequest = {
      type: types.RESET_PLAN,
    };
    expect(actions.resetPlan()).toEqual(resetPlanRequest);
  });
  it('should create actions to load plans when req is not in state', () => {
    const plans = [{ id: 1, name: 'Plan' }];
    const resp = { data: { nodes: plans, total: 1 } };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_PLAN_LOADING,
        payload: { loading: true },
      },
      {
        type: types.SET_PLAN_REQUEST,
        payload: {
          req: { page: 1, limit: 5, ids: [1] },
          total: 1,
        },
      },
      {
        type: types.ADD_PLANS,
        payload: { plans: { 1: { id: 1, name: 'Plan' } } },
      },
      {
        type: types.SET_PLAN_IDS,
        payload: { ids: [1] },
      },
      {
        type: types.SET_PLAN_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ plans: initialState });
    store
      .dispatch(actions.loadPlans(1, 5))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/plans?page=1&limit=5` });
      });
  });
  it('should create actions to load plans when req is in state', () => {
    axios.mockRestore();
    const expectedActions = [
      {
        type: types.SET_PLAN_IDS,
        payload: { ids: [1] },
      },
    ];

    const store = mockStore({
      plans: {
        loading: false,
        ids: [],
        req: [{ page: 1, limit: 5, ids: [1] }],
        items: { 1: { id: 1, name: 'Plan' } },
        total: 1,
      },
    });
    store.dispatch(actions.loadPlans(1, 5));
    expect(store.getActions()).toEqual(expectedActions);
    expect(axios).not.toHaveBeenCalled();
  });
  it('should create actions to create plan', () => {
    const plan = { name: 'Plan' };
    const resp = { data: plan };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_PLAN_LOADING,
        payload: { loading: true },
      },
      {
        type: types.RESET_PLAN,
      },
      {
        type: types.SET_PLAN_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ plans: initialState });
    store
      .dispatch(actions.createPlan(plan))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'post', url: `/plans`, data: plan });
      });
  });
  it('should create actions to update plan without product', () => {
    const plan = { id: 1, plan: 'tester 1' };
    const resp = { data: plan };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_PLAN_LOADING,
        payload: { loading: true },
      },
      {
        type: types.ADD_PLAN,
        payload: {
          plan: { id: 1, plan: 'tester 1' },
        },
      },
      {
        type: types.SET_PLAN_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ plans: initialState });
    store
      .dispatch(actions.updatePlan(1, plan))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'put', url: `/plans/1`, data: plan });
      });
  });
  it('should create actions to delete plan success', () => {
    axios.mockRestore();
    axios.mockResolvedValueOnce();

    const expectedActions = [
      {
        type: types.SET_PLAN_LOADING,
        payload: { loading: true },
      },
      {
        type: types.RESET_PLAN,
      },
      {
        type: types.SET_PLAN_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ plans: initialState });
    store
      .dispatch(actions.deletePlan(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'delete', url: `/plans/1` });
      });
  });
  it('should create actions to get plan by id when plan is in state', () => {
    axios.mockRestore();
    const store = mockStore({
      plans: {
        loading: false,
        ids: [],
        req: [{ page: 1, limit: 5, ids: [1] }],
        items: { 1: { id: 1, name: 'Plan' } },
        total: 1,
      },
    });
    store
      .dispatch(actions.getPlan(1))
      .then(() => {
        expect(store.getActions()).toEqual([]);
      })
      .then(() => {
        expect(axios).not.toHaveBeenCalled();
      });
  });
  it('should create actions to get plan by id when plan is not in state', () => {
    const id = 1;
    const plan = { id, name: 'Plan' };
    const resp = { data: plan };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_PLAN_LOADING,
        payload: { loading: true },
      },
      {
        type: types.ADD_PLAN,
        payload: { plan: { id, name: 'Plan' } },
      },
      {
        type: types.SET_PLAN_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ plans: initialState });
    store
      .dispatch(actions.getPlan(id))
      .then(() => expect(store.getActions()).toEqual(expectedActions))
      .then(() => expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/plans/1` }));
  });
});
