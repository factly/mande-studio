import axios from '../utils/axios';
import {
  baseUrl,
  ADD_CURRENCIES_LIST_REQUEST,
  SET_CURRENCIES_LIST_CURRENT_PAGE,
  GET_CURRENCY_SUCCESS,
  GET_CURRENCY_FAILURE,
  LOADING_CURRENCIES,
  LOAD_CURRENCIES_SUCCESS,
  SET_CURRENCIES_LIST_TOTAL,
  LOAD_CURRENCIES_FAILURE,
  CREATING_CURRENCY,
  CREATE_CURRENCY_SUCCESS,
  CREATE_CURRENCY_FAILURE,
  UPDATING_CURRENCY,
  UPDATE_CURRENCY_SUCCESS,
  UPDATE_CURRENCY_FAILURE,
  DELETING_CURRENCY,
  DELETE_CURRENCY_SUCCESS,
  DELETE_CURRENCY_FAILURE,
} from '../constants/currencies';
import { getIds, buildObjectOfItems } from '../utils/objects';

export const loadCurrencies = (page, limit) => {
  return async (dispatch, getState) => {
    let url = baseUrl;
    if (page && limit) {
      url = `${url}?page=${page}&limit=${limit}`;
    }

    const {
      currencies: { req },
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

    dispatch(loadingCurrencies());

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(loadCurrenciesFailure(error.message));
    });

    if (response) {
      const { nodes, total } = response.data;
      const currentPageIds = getIds(nodes);
      const req = { page: page, limit: limit, ids: currentPageIds };
      dispatch(addListRequest(req));
      dispatch(loadCurrenciesSuccess(nodes));
      dispatch(setListCurrentPage(currentPageIds));
      dispatch(setCurrenciesListTotal(total));
    }
  };
};

export const createCurrency = (data) => {
  return async (dispatch, getState) => {
    dispatch(creatingCurrency());

    const response = await axios({
      url: baseUrl,
      method: 'post',
      data: data,
    }).catch((error) => {
      dispatch(createCurrencyFailure(error.message));
    });

    if (response) {
      dispatch(createCurrencySuccess(response.data));
    }
  };
};

export const updateCurrency = (id, data) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}`;

    dispatch(updatingCurrency());

    const response = await axios({
      url: url,
      method: 'put',
      data: data,
    }).catch((error) => {
      dispatch(updateCurrencyFailure(error.message));
    });

    if (response) {
      dispatch(updateCurrencySuccess(response.data));
    }
  };
};

export const deleteCurrency = (id) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}`;

    dispatch(deletingCurrency());

    const response = await axios({
      url: url,
      method: 'delete',
    }).catch((error) => {
      dispatch(deleteCurrencyFailure(error.message));
    });

    if (response) {
      dispatch(deleteCurrencySuccess(id));
    }
  };
};

export const getCurrency = (id) => {
  return async (dispatch, getState) => {
    const {
      currencies: { items },
    } = getState();

    if (items[id]) {
      dispatch(getCurrencySuccess({ ...items[id] }));
      return;
    }

    dispatch(loadingCurrencies());

    const response = await axios({
      url: `${baseUrl}/${id}`,
      method: 'get',
    }).catch((error) => {
      dispatch(getCurrencyFailure(error.message));
    });

    if (response) {
      dispatch(getCurrencySuccess(response.data));
    }
  };
};

const getCurrencySuccess = (currency) => {
  return {
    type: GET_CURRENCY_SUCCESS,
    payload: currency,
  };
};

const getCurrencyFailure = (message) => {
  return {
    type: GET_CURRENCY_FAILURE,
    payload: message,
  };
};

const loadingCurrencies = () => {
  return {
    type: LOADING_CURRENCIES,
  };
};

const setCurrenciesListTotal = (total) => {
  return {
    type: SET_CURRENCIES_LIST_TOTAL,
    payload: total,
  };
};

const addListRequest = (req) => {
  return {
    type: ADD_CURRENCIES_LIST_REQUEST,
    payload: req,
  };
};

const setListCurrentPage = (ids) => {
  return {
    type: SET_CURRENCIES_LIST_CURRENT_PAGE,
    payload: ids,
  };
};

export const loadCurrenciesSuccess = (currencies) => {
  return {
    type: LOAD_CURRENCIES_SUCCESS,
    payload: {
      items: buildObjectOfItems(currencies),
    },
  };
};

const loadCurrenciesFailure = (message) => {
  return {
    type: LOAD_CURRENCIES_FAILURE,
    payload: message,
  };
};

const creatingCurrency = () => {
  return {
    type: CREATING_CURRENCY,
  };
};

const createCurrencySuccess = (currency) => {
  return {
    type: CREATE_CURRENCY_SUCCESS,
    payload: currency,
  };
};

const createCurrencyFailure = (message) => {
  return {
    type: CREATE_CURRENCY_FAILURE,
    payload: message,
  };
};

const updatingCurrency = () => {
  return {
    type: UPDATING_CURRENCY,
  };
};

const updateCurrencySuccess = (currency) => {
  return {
    type: UPDATE_CURRENCY_SUCCESS,
    payload: currency,
  };
};

const updateCurrencyFailure = (message) => {
  return {
    type: UPDATE_CURRENCY_FAILURE,
    payload: message,
  };
};

const deletingCurrency = () => {
  return {
    type: DELETING_CURRENCY,
  };
};

const deleteCurrencySuccess = (id) => {
  return {
    type: DELETE_CURRENCY_SUCCESS,
    payload: id,
  };
};

const deleteCurrencyFailure = (message) => {
  return {
    type: DELETE_CURRENCY_FAILURE,
    payload: message,
  };
};
