import axios from '../utils/axios';
import {
  baseUrl,
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

    dispatch(loadingCurrencies());

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(loadCurrenciesFailure(error.message));
    });

    if (response) {
      const { nodes, total } = response.data;
      dispatch(loadCurrenciesSuccess(nodes));
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

export const loadCurrenciesSuccess = (currencies) => {
  return {
    type: LOAD_CURRENCIES_SUCCESS,
    payload: {
      ids: getIds(currencies),
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
