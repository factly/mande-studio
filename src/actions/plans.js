import axios from '../utils/axios';
import {
  baseUrl,
  LOADING_PLANS,
  LOAD_PLANS_SUCCESS,
  SET_PLANS_LIST_TOTAL,
  LOAD_PLANS_FAILURE,
  CREATING_PLAN,
  CREATE_PLAN_SUCCESS,
  CREATE_PLAN_FAILURE,
  UPDATING_PLAN,
  UPDATE_PLAN_SUCCESS,
  UPDATE_PLAN_FAILURE,
  DELETING_PLAN,
  DELETE_PLAN_SUCCESS,
  DELETE_PLAN_FAILURE,
} from '../constants/plans';
import { getIds, buildObjectOfItems } from '../utils/objects';

export const loadPlans = (page, limit) => {
  return async (dispatch, getState) => {
    let url = baseUrl;
    if (page && limit) {
      url = `${url}?page=${page}&limit=${limit}`;
    }

    dispatch(loadingPlans());

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(loadPlansFailure(error.message));
    });

    if (response) {
      const { nodes, total } = response.data;
      dispatch(loadPlansSuccess(nodes));
      dispatch(setPlansListTotal(total));
    }
  };
};

export const createPlan = (data) => {
  return async (dispatch, getState) => {
    dispatch(creatingPlan());

    const response = await axios({
      url: baseUrl,
      method: 'post',
      data: data,
    }).catch((error) => {
      dispatch(createPlanFailure(error.message));
    });

    if (response) {
      dispatch(createPlanSuccess(response.data));
    }
  };
};

export const updatePlan = (id, data) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}`;

    dispatch(updatingPlan());

    const response = await axios({
      url: url,
      method: 'put',
      data: data,
    }).catch((error) => {
      dispatch(updatePlanFailure(error.message));
    });

    if (response) {
      dispatch(updatePlanSuccess(response.data));
    }
  };
};

export const deletePlan = (id) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}`;

    dispatch(deletingPlan());

    const response = await axios({
      url: url,
      method: 'delete',
    }).catch((error) => {
      dispatch(deletePlanFailure(error.message));
    });

    if (response) {
      dispatch(deletePlanSuccess(id));
    }
  };
};

const loadingPlans = () => {
  return {
    type: LOADING_PLANS,
  };
};

const setPlansListTotal = (total) => {
  return {
    type: SET_PLANS_LIST_TOTAL,
    payload: total,
  };
};

export const loadPlansSuccess = (plans) => {
  return {
    type: LOAD_PLANS_SUCCESS,
    payload: {
      ids: getIds(plans),
      items: buildObjectOfItems(plans),
    },
  };
};

const loadPlansFailure = (message) => {
  return {
    type: LOAD_PLANS_FAILURE,
    payload: message,
  };
};

const creatingPlan = () => {
  return {
    type: CREATING_PLAN,
  };
};

const createPlanSuccess = (plan) => {
  return {
    type: CREATE_PLAN_SUCCESS,
    payload: plan,
  };
};

const createPlanFailure = (message) => {
  return {
    type: CREATE_PLAN_FAILURE,
    payload: message,
  };
};

const updatingPlan = () => {
  return {
    type: UPDATING_PLAN,
  };
};

const updatePlanSuccess = (plan) => {
  return {
    type: UPDATE_PLAN_SUCCESS,
    payload: plan,
  };
};

const updatePlanFailure = (message) => {
  return {
    type: UPDATE_PLAN_FAILURE,
    payload: message,
  };
};

const deletingPlan = () => {
  return {
    type: DELETING_PLAN,
  };
};

const deletePlanSuccess = (id) => {
  return {
    type: DELETE_PLAN_SUCCESS,
    payload: id,
  };
};

const deletePlanFailure = (message) => {
  return {
    type: DELETE_PLAN_FAILURE,
    payload: message,
  };
};
