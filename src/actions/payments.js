import axios from '../utils/axios';
import {
  baseUrl,
  ADD_PAYMENTS_LIST_REQUEST,
  SET_PAYMENTS_LIST_CURRENT_PAGE,
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

    const {
      payments: { req },
    } = getState();

    let found = false;
    let ids;
    for (let item of req) {
      if (item.page === page && item.limit === limit) {
        ids = [...item.ids];
        found = true;
      }
    }

    if (found) {
      dispatch(setListCurrentPage(ids));
      return;
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

      const currentPageIds = getIds(nodes);
      const req = { page: page, limit: limit, ids: currentPageIds };
      dispatch(addListRequest(req));
      dispatch(loadPaymentsSuccess(nodes));
      dispatch(setListCurrentPage(currentPageIds));
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

const addListRequest = (req) => {
  return {
    type: ADD_PAYMENTS_LIST_REQUEST,
    payload: req,
  };
};

const setListCurrentPage = (ids) => {
  return {
    type: SET_PAYMENTS_LIST_CURRENT_PAGE,
    payload: ids,
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
