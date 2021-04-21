import axios from '../utils/axios';
import {
  ADD_PLAN,
  ADD_PLANS,
  SET_PLAN_LOADING,
  SET_PLAN_REQUEST,
  SET_PLAN_IDS,
  RESET_PLAN,
  PLAN_API,
} from '../constants/plans';
import { addCurrencies } from './currencies';
import { addCatalogs } from './catalogs';
import { getIds, buildObjectOfItems, getValues, deleteKeys } from '../utils/objects';

export const loadPlans = (query) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));

    const response = await axios({
      url: PLAN_API,
      method: 'get',
      params: query
    });

    const { nodes, total } = response.data;
    const currentPageIds = getIds(nodes);
    const currentReq = { ...query ,ids: currentPageIds };
    dispatch(setPlanRequest(currentReq, total));
    dispatch(addPlans(nodes));
    dispatch(setPlanIds(currentPageIds));

    dispatch(setLoading(false));
  };
};

export const createPlan = (data) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));

    await axios({
      url: PLAN_API,
      method: 'post',
      data: data,
    });

    dispatch(resetPlan());
    dispatch(setLoading(false));
  };
};

export const updatePlan = (id, data) => {
  return async (dispatch, getState) => {
    let url = `${PLAN_API}/${id}`;

    dispatch(setLoading(true));

    const response = await axios({
      url: url,
      method: 'put',
      data: data,
    });

    dispatch(addPlan(response.data));
    dispatch(setLoading(false));
  };
};

export const deletePlan = (id) => {
  return async (dispatch, getState) => {
    let url = `${PLAN_API}/${id}`;

    dispatch(setLoading(true));

    await axios({
      url: url,
      method: 'delete',
    });

    dispatch(resetPlan());
    dispatch(setLoading(false));
  };
};

export const getPlan = (id) => {
  return async (dispatch, getState) => {
    const {
      plans: { items },
    } = getState();

    if (items[id]) {
      return;
    }

    dispatch(setLoading(true));

    const response = await axios({
      url: `${PLAN_API}/${id}`,
      method: 'get',
    });
    dispatch(addPlan(response.data));

    dispatch(setLoading(false));
  };
};

export const setLoading = (loading) => {
  return {
    type: SET_PLAN_LOADING,
    payload: { loading },
  };
};

export const addPlan = (plan) => (dispatch) => {
  const currencies = getValues([plan], 'currency');
  dispatch(addCurrencies(currencies));

  const catalogs = getValues([plan], 'catalogs');
  dispatch(addCatalogs(catalogs));

  plan.catalogs = getIds(plan.catalogs);

  dispatch({
    type: ADD_PLAN,
    payload: { plan: deleteKeys([plan], ['currency'])[0] },
  });
};

export const addPlans = (plans) => (dispatch) => {
  const currencies = getValues(plans, 'currency');
  dispatch(addCurrencies(currencies));

  const catalogs = getValues(plans, 'catalogs');
  dispatch(addCatalogs(catalogs));

  plans.forEach((plan) => {
    plan.catalogs = getIds(plan.catalogs);
  });

  dispatch({
    type: ADD_PLANS,
    payload: {
      plans: buildObjectOfItems(deleteKeys(plans, ['currency'])),
    },
  });
};

export const setPlanRequest = (req, total) => {
  return {
    type: SET_PLAN_REQUEST,
    payload: { req, total },
  };
};

export const setPlanIds = (ids) => {
  return {
    type: SET_PLAN_IDS,
    payload: { ids },
  };
};

export const resetPlan = () => {
  return {
    type: RESET_PLAN,
  };
};
