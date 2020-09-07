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
import { getIds, buildObjectOfItems } from '../utils/objects';

export const loadPlans = (page = 1, limit = 5) => {
  return async (dispatch, getState) => {
    const {
      plans: { req },
    } = getState();

    let ids;
    for (let item of req) {
      if (item.page === page && item.limit === limit) {
        ids = [...item.ids];
      }
    }

    if (ids) {
      dispatch(setPlanIds(ids));
      return;
    }

    dispatch(setLoading(true));

    const response = await axios({
      url: `${PLAN_API}?page=${page}&limit=${limit}`,
      method: 'get',
    });

    const { nodes, total } = response.data;
    const currentPageIds = getIds(nodes);
    const currentReq = { page: page, limit: limit, ids: currentPageIds };
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

export const addPlan = (plan) => {
  return {
    type: ADD_PLAN,
    payload: { plan },
  };
};

export const addPlans = (plans) => {
  return {
    type: ADD_PLANS,
    payload: {
      plans: buildObjectOfItems(plans),
    },
  };
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
