import axios from '../utils/axios';
import {
  baseUrl,
  LOADING_PAYMENTS,
  LOAD_PAYMENTS_SUCCESS,
  LOAD_PAYMENTS_FAILURE,
} from '../constants/payments';

export const loadPayments = (page, limit) => {
  return async (dispatch, getState) => {
    let url = baseUrl;
    if (page && limit) {
      url = `${url}?page=${page}&limit=${limit}`;
    }

    dispatch(loadingPayments());

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(loadPaymentsFailure(error.message));
    });

    if (response) {
      dispatch(loadPaymentsSuccess(response.data));
    }
  };
};

const loadingPayments = () => {
  return {
    type: LOADING_PAYMENTS,
  };
};

const loadPaymentsSuccess = (data) => {
  return {
    type: LOAD_PAYMENTS_SUCCESS,
    payload: {
      items: data.nodes,
      total: data.total,
    },
  };
};

const loadPaymentsFailure = (message) => {
  return {
    type: LOAD_PAYMENTS_FAILURE,
    payload: message,
  };
};
