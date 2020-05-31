import axios from '../utils/axios';
import {
  baseUrl,
  LOADING_PLANS,
  LOAD_PLANS_SUCCESS,
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
      dispatch(loadPlansSuccess(response.data));
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

export const updatePlan = (id, data, index) => {
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
      dispatch(updatePlanSuccess(index, response.data));
    }
  };
};

export const deletePlan = (id, index) => {
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
      dispatch(deletePlanSuccess(index));
    }
  };
};

const loadingPlans = () => {
  return {
    type: LOADING_PLANS,
  };
};

const loadPlansSuccess = (data) => {
  return {
    type: LOAD_PLANS_SUCCESS,
    payload: {
      items: data.nodes,
      total: data.total,
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

const updatePlanSuccess = (index, plan) => {
  return {
    type: UPDATE_PLAN_SUCCESS,
    payload: { index, plan },
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

const deletePlanSuccess = (index) => {
  return {
    type: DELETE_PLAN_SUCCESS,
    payload: index,
  };
};

const deletePlanFailure = (message) => {
  return {
    type: DELETE_PLAN_FAILURE,
    payload: message,
  };
};
