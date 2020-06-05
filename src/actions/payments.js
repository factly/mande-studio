import axios from '../utils/axios';
import {
  baseUrl,
  LOADING_PAYMENTS,
  LOAD_PAYMENTS_SUCCESS,
  LOAD_PAYMENTS_FAILURE,
  SET_PAYMENTS_LIST_TOTAL,
} from '../constants/payments';
import { loadCurrenciesSuccess } from './currencies';
import { getIds, getValues, deleteKeys, buildObjectOfItems } from '../utils/objects';

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
      const { nodes, total } = response.data;

      const currencies = getValues(nodes, 'currency');
      dispatch(loadCurrenciesSuccess(currencies));

      dispatch(loadPaymentsSuccess(nodes));
      dispatch(setPaymentsListTotal(total));
    }
  };
};

const loadingPayments = () => {
  return {
    type: LOADING_PAYMENTS,
  };
};

const setPaymentsListTotal = (total) => {
  return {
    type: SET_PAYMENTS_LIST_TOTAL,
    payload: total,
  };
};

export const loadPaymentsSuccess = (payments) => {
  return {
    type: LOAD_PAYMENTS_SUCCESS,
    payload: {
      ids: getIds(payments),
      items: buildObjectOfItems(deleteKeys(payments, ['currency'])),
    },
  };
};

const loadPaymentsFailure = (message) => {
  return {
    type: LOAD_PAYMENTS_FAILURE,
    payload: message,
  };
};
