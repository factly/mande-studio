import axios from '../utils/axios';
import {
  ADD_PAYMENTS,
  SET_PAYMENT_LOADING,
  SET_PAYMENT_REQUEST,
  SET_PAYMENT_IDS,
  PAYMENT_API,
} from '../constants/payments';
import { addCurrencies } from './currencies';
import { getIds, getValues, deleteKeys, buildObjectOfItems } from '../utils/objects';

export const loadPayments = (page = 1, limit = 5) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));

    const response = await axios({
      url: `${PAYMENT_API}?page=${page}&limit=${limit}`,
      method: 'get',
    });

    const { nodes, total } = response.data;
    const currentPageIds = getIds(nodes);
    const currentReq = { page: page, limit: limit, ids: currentPageIds };
    dispatch(setPaymentRequest(currentReq, total));
    dispatch(addPayments(nodes));
    dispatch(setPaymentIds(currentPageIds));

    dispatch(setLoading(false));
  };
};

export const setLoading = (loading) => {
  return {
    type: SET_PAYMENT_LOADING,
    payload: { loading },
  };
};

export const addPayments = (payments) => (dispatch) => {
  const currencies = getValues(payments, 'currency');
  dispatch(addCurrencies(currencies));

  dispatch({
    type: ADD_PAYMENTS,
    payload: {
      payments: buildObjectOfItems(deleteKeys(payments, ['currency'])),
    },
  });
};

export const setPaymentRequest = (req, total) => {
  return {
    type: SET_PAYMENT_REQUEST,
    payload: { req, total },
  };
};

export const setPaymentIds = (ids) => {
  return {
    type: SET_PAYMENT_IDS,
    payload: { ids },
  };
};
