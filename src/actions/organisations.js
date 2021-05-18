import {
  SET_ORGANISATION_LOADING,
  ADD_ORGANISATION,
  API_GET_ORGANISATION,
} from '../constants/organisations';
import axios from 'axios';

export const getOrganisation = () => {
  return (dispatch) => {
    dispatch(setLoading());
    return axios
      .get(API_GET_ORGANISATION)
      .then((response) => {
        dispatch(addOrganisation(response.data));
        dispatch(setLoading());
      })
      .catch((err) => {
        dispatch(setLoading());
      });
  };
};

export const setLoading = (loading) => {
  return {
    type: SET_ORGANISATION_LOADING,
  };
};

export const addOrganisation = (org) => {
  return {
    type: ADD_ORGANISATION,
    payload: org,
  };
};
