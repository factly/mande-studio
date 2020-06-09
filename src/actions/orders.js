import axios from '../utils/axios';
import {
  baseUrl,
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
import { loadProductTypesSuccess } from './product_types';
import { loadCurrenciesSuccess } from './currencies';
import { loadProductsSuccess } from './products';
import { getIds, getValues, deleteKeys, buildObjectOfItems } from '../utils/objects';

export const loadOrders = (page = 1, limit) => {
  return async (dispatch, getState) => {
    let url = baseUrl;
    if (page && limit) {
      url = `${url}?page=${page}&limit=${limit}`;
    }

    dispatch(setListCurrentPage(page));

    const {
      orders: {
        list: { pagination },
      },
    } = getState();

    if (pagination.pages[page]) {
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
      dispatch(loadCurrenciesSuccess(currencies));
      dispatch(loadPaymentsSuccess(payments));

      dispatch(loadOrdersSuccess(nodes));
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

    dispatch(setDetailsCurrentPage(page));

    const {
      orders: {
        details: { pagination },
      },
    } = getState();

    if (pagination.pages[page]) return;

    dispatch(loadingOrderItems());

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(getOrderItemsFailure(error.message));
    });

    if (response) {
      const { nodes, total } = response.data;

      const products = getValues(nodes, 'product');
      const productTypes = getValues(products, 'product_type');
      const currencies = getValues(products, 'currency');
      dispatch(loadCurrenciesSuccess(currencies));
      dispatch(loadProductTypesSuccess(productTypes));
      dispatch(loadProductsSuccess(products));

      dispatch(getOrderItemsSuccess(nodes));
      dispatch(setOrderItemsListTotal(total));
    }
  };
};

const setListCurrentPage = (currentPage) => {
  return {
    type: SET_ORDERS_LIST_CURRENT_PAGE,
    payload: currentPage,
  };
};

const setDetailsCurrentPage = (currentPage) => {
  return {
    type: SET_ORDER_DETAILS_CURRENT_PAGE,
    payload: currentPage,
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
      ids: getIds(orders),
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
      ids: getIds(orderItems),
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
