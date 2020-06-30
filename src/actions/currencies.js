import axios from '../utils/axios';
import {
  ADD_CURRENCY,
  ADD_CURRENCIES,
  SET_CURRENCY_LOADING,
  SET_CURRENCY_REQUEST,
  SET_CURRENCY_IDS,
  RESET_CURRENCY,
  CURRENCY_API,
} from '../constants/currencies';
import { getIds, buildObjectOfItems } from '../utils/objects';

export const loadCurrencies = (page = 1, limit = 5) => {
  return async (dispatch, getState) => {
    const {
      currencies: { req },
    } = getState();

    let ids;
    for (let item of req) {
      if (item.page === page && item.limit === limit) {
        ids = [...item.ids];
      }
    }

    if (ids) {
      dispatch(setCurrencyIds(ids));
      return;
    }

    dispatch(setLoading(true));

    const response = await axios({
      url: `${CURRENCY_API}?page=${page}&limit=${limit}`,
      method: 'get',
    });

    const { nodes, total } = response.data;
    const currentPageIds = getIds(nodes);
    const currentReq = { page: page, limit: limit, ids: currentPageIds };
    dispatch(setCurrencyRequest(currentReq, total));
    dispatch(addCurrencies(nodes));
    dispatch(setCurrencyIds(currentPageIds));

    dispatch(setLoading(false));
  };
};

export const createCurrency = (data) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));

    await axios({
      url: CURRENCY_API,
      method: 'post',
      data: data,
    });

    dispatch(resetCurrency());
    dispatch(setLoading(false));
  };
};

export const updateCurrency = (id, data) => {
  return async (dispatch, getState) => {
    let url = `${CURRENCY_API}/${id}`;

    dispatch(setLoading(true));

    const response = await axios({
      url: url,
      method: 'put',
      data: data,
    });

    dispatch(addCurrency(response.data));
    dispatch(setLoading(false));
  };
};

export const deleteCurrency = (id) => {
  return async (dispatch, getState) => {
    let url = `${CURRENCY_API}/${id}`;

    dispatch(setLoading(true));

    await axios({
      url: url,
      method: 'delete',
    });

    dispatch(resetCurrency());
    dispatch(setLoading(false));
  };
};

export const getCurrency = (id) => {
  return async (dispatch, getState) => {
    const {
      currencies: { items },
    } = getState();

    if (items[id]) {
      return;
    }

    dispatch(setLoading(true));

    const response = await axios({
      url: `${CURRENCY_API}/${id}`,
      method: 'get',
    });
    dispatch(addCurrency(response.data));

    dispatch(setLoading(false));
  };
};

const setLoading = (loading) => {
  return {
    type: SET_CURRENCY_LOADING,
    payload: { loading },
  };
};

const addCurrency = (currency) => {
  return {
    type: ADD_CURRENCY,
    payload: { currency },
  };
};

export const addCurrencies = (currencies) => {
  return {
    type: ADD_CURRENCIES,
    payload: {
      currencies: buildObjectOfItems(currencies),
    },
  };
};

const setCurrencyRequest = (req, total) => {
  return {
    type: SET_CURRENCY_REQUEST,
    payload: { req, total },
  };
};

const setCurrencyIds = (ids) => {
  return {
    type: SET_CURRENCY_IDS,
    payload: { ids },
  };
};

const resetCurrency = () => {
  return {
    type: RESET_CURRENCY,
  };
};
