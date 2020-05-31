import axios from '../utils/axios';
import {
  baseUrl,
  LOADING_MEMBERSHIPS,
  LOAD_MEMBERSHIPS_SUCCESS,
  LOAD_MEMBERSHIPS_FAILURE,
} from '../constants/memberships';

export const loadMemberships = (page, limit) => {
  return async (dispatch, getState) => {
    let url = baseUrl;
    if (page && limit) {
      url = `${url}?page=${page}&limit=${limit}`;
    }

    dispatch(loadingMemberships());

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(loadMembershipsFailure(error.message));
    });

    if (response) {
      dispatch(loadMembershipsSuccess(response.data.nodes));
    }
  };
};

const loadingMemberships = () => {
  return {
    type: LOADING_MEMBERSHIPS,
  };
};

const loadMembershipsSuccess = (memberships) => {
  return {
    type: LOAD_MEMBERSHIPS_SUCCESS,
    payload: memberships,
  };
};

const loadMembershipsFailure = (message) => {
  return {
    type: LOAD_MEMBERSHIPS_FAILURE,
    payload: message,
  };
};
