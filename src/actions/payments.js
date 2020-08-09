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
    const {
      payments: { req },
    } = getState();

    let ids;
    for (let item of req) {
      if (item.page === page && item.limit === limit) {
        ids = [...item.ids];
      }
    }

    if (ids) {
      dispatch(setPaymentIds(ids));
      return;
    }

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

const setLoading = (loading) => {
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

const setPaymentRequest = (req, total) => {
  return {
    type: SET_PAYMENT_REQUEST,
    payload: { req, total },
  };
};

const setPaymentIds = (ids) => {
  return {
    type: SET_PAYMENT_IDS,
    payload: { ids },
  };
};
