import axios from '../utils/axios';
import {
  baseUrl,
  LOADING_CURRENCIES,
  LOAD_CURRENCIES_SUCCESS,
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
      dispatch(loadCurrenciesSuccess(response.data.nodes));
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

export const updateCurrency = (id, data, index) => {
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
      dispatch(updateCurrencySuccess(index, response.data));
    }
  };
};

export const deleteCurrency = (id, index) => {
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
      dispatch(deleteCurrencySuccess(index));
    }
  };
};

const loadingCurrencies = () => {
  return {
    type: LOADING_CURRENCIES,
  };
};

const loadCurrenciesSuccess = (currencies) => {
  return {
    type: LOAD_CURRENCIES_SUCCESS,
    payload: currencies,
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

const updateCurrencySuccess = (index, currency) => {
  return {
    type: UPDATE_CURRENCY_SUCCESS,
    payload: { index, currency },
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

const deleteCurrencySuccess = (index) => {
  return {
    type: DELETE_CURRENCY_SUCCESS,
    payload: index,
  };
};

const deleteCurrencyFailure = (message) => {
  return {
    type: DELETE_CURRENCY_FAILURE,
    payload: message,
  };
};
