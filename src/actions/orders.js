import axios from '../utils/axios';
import {
  ADD_ORDER,
  ADD_ORDERS,
  SET_ORDER_LOADING,
  SET_ORDER_REQUEST,
  SET_ORDER_IDS,
  ORDER_API,
} from '../constants/orders';
// import { addCarts } from './carts';
import { addPayments } from './payments';
import { addProducts } from './products';
import { getIds, getValues, deleteKeys, buildObjectOfItems } from '../utils/objects';

export const loadOrders = (page = 1, limit = 5) => {
  return async (dispatch, getState) => {
    const {
      orders: { req },
    } = getState();

    let ids;
    for (let item of req) {
      if (item.page === page && item.limit === limit) {
        ids = [...item.ids];
      }
    }

    if (ids) {
      dispatch(setOrderIds(ids));
      return;
    }

    dispatch(setLoading(true));

    const response = await axios({
      url: `${ORDER_API}?page=${page}&limit=${limit}`,
      method: 'get',
    });

    const { nodes, total } = response.data;
    const currentPageIds = getIds(nodes);
    const currentReq = { page: page, limit: limit, ids: currentPageIds };
    dispatch(setOrderRequest(currentReq, total));
    dispatch(addOrders(nodes));
    dispatch(setOrderIds(currentPageIds));

    dispatch(setLoading(false));
  };
};

export const getOrder = (id) => {
  return async (dispatch, getState) => {
    const {
      orders: { items },
    } = getState();

    if (items[id]) {
      return;
    }

    dispatch(setLoading(true));

    const response = await axios({
      url: `${ORDER_API}/${id}`,
      method: 'get',
    });
    dispatch(addOrder(response.data));

    dispatch(setLoading(false));
  };
};

export const setLoading = (loading) => {
  return {
    type: SET_ORDER_LOADING,
    payload: { loading },
  };
};

export const addOrder = (order) => (dispatch) => {
  const payments = getValues([order], 'payment');
  dispatch(addPayments(payments));

  const products = getValues([order], 'products');
  dispatch(addProducts(products));

  order.products = getIds(order.products);

  dispatch({
    type: ADD_ORDER,
    payload: {
      order: deleteKeys([order], ['payment'])[0],
    },
  });
};

export const addOrders = (orders) => (dispatch) => {
  const payments = getValues(orders, 'payment');
  dispatch(addPayments(payments));

  const products = getValues(orders, 'products');
  dispatch(addProducts(products));

  orders.forEach((order) => {
    order.products = getIds(order.products);
  });

  dispatch({
    type: ADD_ORDERS,
    payload: {
      orders: buildObjectOfItems(deleteKeys(orders, ['payment'])),
    },
  });
};

export const setOrderRequest = (req, total) => {
  return {
    type: SET_ORDER_REQUEST,
    payload: { req, total },
  };
};

export const setOrderIds = (ids) => {
  return {
    type: SET_ORDER_IDS,
    payload: { ids },
  };
};
