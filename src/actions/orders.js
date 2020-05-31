import axios from '../utils/axios';
import {
  baseUrl,
  LOADING_ORDERS,
  LOADING_ORDER_DETAILS,
  LOADING_ORDER_ITEMS,
  LOAD_ORDERS_SUCCESS,
  LOAD_ORDERS_FAILURE,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILURE,
  GET_ORDER_ITEMS_SUCCESS,
  GET_ORDER_ITEMS_FAILURE,
} from '../constants/orders';

export const loadOrders = (page, limit) => {
  return async (dispatch, getState) => {
    let url = baseUrl;
    if (page && limit) {
      url = `${url}?page=${page}&limit=${limit}`;
    }

    dispatch(loadingOrders());

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(loadOrdersFailure(error.message));
    });

    if (response) {
      dispatch(loadOrdersSuccess(response.data));
    }
  };
};

export const getOrderDetails = (id) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}`;

    dispatch(loadingOrderDetails());

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(getOrderDetailsFailure(error.message));
    });

    if (response) {
      dispatch(getOrderDetailsSuccess(response.data));
    }
  };
};

export const getOrderItems = (id, page, limit) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}/items`;
    if (page && limit) {
      url = `${url}?page=${page}&limit=${limit}`;
    }

    dispatch(loadingOrderItems());

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(getOrderItemsFailure(error.message));
    });

    if (response) {
      dispatch(getOrderItemsSuccess(response.data));
    }
  };
};

const loadingOrders = () => {
  return {
    type: LOADING_ORDERS,
  };
};

const loadingOrderDetails = () => {
  return {
    type: LOADING_ORDER_DETAILS,
  };
};

const loadingOrderItems = () => {
  return {
    type: LOADING_ORDER_ITEMS,
  };
};

const loadOrdersSuccess = (data) => {
  return {
    type: LOAD_ORDERS_SUCCESS,
    payload: {
      items: data.nodes,
      total: data.total,
    },
  };
};

const loadOrdersFailure = (message) => {
  return {
    type: LOAD_ORDERS_FAILURE,
    payload: message,
  };
};

const getOrderDetailsSuccess = (order) => {
  return {
    type: GET_ORDER_DETAILS_SUCCESS,
    payload: order,
  };
};

const getOrderDetailsFailure = (message) => {
  return {
    type: GET_ORDER_DETAILS_FAILURE,
    payload: message,
  };
};

const getOrderItemsSuccess = (data) => {
  return {
    type: GET_ORDER_ITEMS_SUCCESS,
    payload: {
      items: data.nodes,
      total: data.total,
    },
  };
};

const getOrderItemsFailure = (message) => {
  return {
    type: GET_ORDER_ITEMS_FAILURE,
    payload: message,
  };
};
