import axios from '../utils/axios';
import {
  baseUrl,
  ADD_ORDERS_LIST_REQUEST,
  ADD_ORDER_DETAILS_REQUEST,
  LOADING_ORDERS,
  LOADING_ORDER_DETAILS,
  LOADING_ORDER_ITEMS,
  SET_ORDERS_LIST_TOTAL,
  SET_ORDERS_LIST_CURRENT_PAGE,
  LOAD_ORDERS_SUCCESS,
  LOAD_ORDERS_FAILURE,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILURE,
  GET_ORDER_ITEMS_SUCCESS,
  SET_ORDER_ITEMS_LIST_TOTAL,
  SET_ORDER_DETAILS_CURRENT_PAGE,
  GET_ORDER_ITEMS_FAILURE,
} from '../constants/orders';
import { loadCartsSuccess } from './carts';
import { loadPaymentsSuccess } from './payments';
import { addCurrencies } from './currencies';
import { loadProductsSuccess } from './products';
import { getIds, getValues, deleteKeys, buildObjectOfItems } from '../utils/objects';

export const loadOrders = (page = 1, limit) => {
  return async (dispatch, getState) => {
    let url = baseUrl;
    if (page && limit) {
      url = `${url}?page=${page}&limit=${limit}`;
    }

    const {
      orders: {
        list: { req },
      },
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

    dispatch(loadingOrders());

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(loadOrdersFailure(error.message));
    });

    if (response) {
      const { nodes, total } = response.data;

      const carts = getValues(nodes, 'cart');
      dispatch(loadCartsSuccess(carts));

      const payments = getValues(nodes, 'payment');
      const currencies = getValues(payments, 'currency');
      dispatch(addCurrencies(currencies));
      dispatch(loadPaymentsSuccess(payments));

      const currentPageIds = getIds(nodes);
      const req = { page: page, limit: limit, ids: currentPageIds };
      dispatch(addListRequest(req));
      dispatch(loadOrdersSuccess(nodes));
      dispatch(setListCurrentPage(currentPageIds));
      dispatch(setOrdersListTotal(total));
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

export const getOrderItems = (id, page = 1, limit) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}/items`;
    if (page && limit) {
      url = `${url}?page=${page}&limit=${limit}`;
    }

    dispatch(loadingOrderItems());

    const {
      orders: {
        details: { req },
      },
    } = getState();

    let reqObj;
    for (let item of req) {
      if (item.orderId === id && item.page === page && item.limit === limit) {
        reqObj = item;
        break;
      }
    }

    if (reqObj) {
      dispatch(setDetailsCurrentPage(reqObj.ids));
      dispatch(setOrderItemsListTotal(reqObj.total));
      return;
    }

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(getOrderItemsFailure(error.message));
    });

    if (response) {
      const { nodes, total } = response.data;

      const products = getValues(nodes, 'product');
      const currencies = getValues(products, 'currency');
      dispatch(addCurrencies(currencies));
      dispatch(loadProductsSuccess(products));

      const currentPageIds = getIds(nodes);
      const req = { orderId: id, page, limit, ids: currentPageIds, total };
      dispatch(addDetailsRequest(req));
      dispatch(getOrderItemsSuccess(nodes));
      dispatch(setDetailsCurrentPage(currentPageIds));
      dispatch(setOrderItemsListTotal(total));
    }
  };
};

const setListCurrentPage = (ids) => {
  return {
    type: SET_ORDERS_LIST_CURRENT_PAGE,
    payload: ids,
  };
};

const setDetailsCurrentPage = (ids) => {
  return {
    type: SET_ORDER_DETAILS_CURRENT_PAGE,
    payload: ids,
  };
};

const addListRequest = (req) => {
  return {
    type: ADD_ORDERS_LIST_REQUEST,
    payload: req,
  };
};

const addDetailsRequest = (req) => {
  return {
    type: ADD_ORDER_DETAILS_REQUEST,
    payload: req,
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

const setOrdersListTotal = (total) => {
  return {
    type: SET_ORDERS_LIST_TOTAL,
    payload: total,
  };
};

const setOrderItemsListTotal = (total) => {
  return {
    type: SET_ORDER_ITEMS_LIST_TOTAL,
    payload: total,
  };
};

const loadOrdersSuccess = (orders) => {
  return {
    type: LOAD_ORDERS_SUCCESS,
    payload: {
      items: buildObjectOfItems(deleteKeys(orders, ['cart', 'payment'])),
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

const getOrderItemsSuccess = (orderItems) => {
  return {
    type: GET_ORDER_ITEMS_SUCCESS,
    payload: {
      items: buildObjectOfItems(deleteKeys(orderItems, ['product'])),
    },
  };
};

const getOrderItemsFailure = (message) => {
  return {
    type: GET_ORDER_ITEMS_FAILURE,
    payload: message,
  };
};
