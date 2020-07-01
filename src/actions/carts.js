import axios from '../utils/axios';
import {
  baseUrl,
  ADD_CARTS_LIST_REQUEST,
  ADD_CART_DETAILS_REQUEST,
  LOADING_CARTS,
  LOADING_CART_DETAILS,
  SET_CART_LIST_TOTAL,
  SET_CARTS_LIST_CURRENT_PAGE,
  SET_CARTS_DETAILS_CURRENT_PAGE,
  LOAD_CARTS_SUCCESS,
  LOAD_CARTS_FAILURE,
  GET_CART_ITEMS_SUCCESS,
  SET_CART_ITEMS_LIST_TOTAL,
  GET_CART_ITEMS_FAILURE,
} from '../constants/carts';
import { addProducts } from './products';
import { addCurrencies } from './currencies';
import { getIds, getValues, deleteKeys, buildObjectOfItems } from '../utils/objects';

export const loadCarts = (page = 1, limit) => {
  return async (dispatch, getState) => {
    let url = baseUrl;
    if (page && limit) {
      url = `${url}?page=${page}&limit=${limit}`;
    }

    const {
      carts: {
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

    dispatch(loadingCarts());

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(loadCartsFailure(error.message));
    });

    if (response) {
      const { nodes, total } = response.data;
      const currentPageIds = getIds(nodes);
      const req = { page: page, limit: limit, ids: currentPageIds };
      dispatch(addListRequest(req));
      dispatch(loadCartsSuccess(nodes));
      dispatch(setListCurrentPage(currentPageIds));
      dispatch(setCartsListTotal(total));
    }
  };
};

export const getCartItems = (id, page = 1, limit) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}/items`;
    if (page && limit) {
      url = `${url}?page=${page}&limit=${limit}`;
    }

    dispatch(loadingCartDetails());

    const {
      carts: {
        details: { req },
      },
    } = getState();

    let reqObj;
    for (let item of req) {
      if (item.cartId === id && item.page === page && item.limit === limit) {
        reqObj = item;
        break;
      }
    }

    if (reqObj) {
      dispatch(setDetailsCurrentPage(reqObj.ids));
      dispatch(setCartItemsListTotal(reqObj.total));
      return;
    }

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(getCartItemsFailure(error.message));
    });

    if (response) {
      const { nodes, total } = response.data;

      const products = getValues(nodes, 'product');

      const currencies = getValues(products, 'currency');
      dispatch(addCurrencies(currencies));

      dispatch(addProducts(products));

      const currentPageIds = getIds(nodes);
      const req = { cartId: id, page, limit, ids: currentPageIds, total };
      dispatch(addDetailsRequest(req));
      dispatch(getCartItemsSuccess(nodes));
      dispatch(setDetailsCurrentPage(currentPageIds));
      dispatch(setCartItemsListTotal(total));
    }
  };
};

const loadingCarts = () => {
  return {
    type: LOADING_CARTS,
  };
};

const loadingCartDetails = () => {
  return {
    type: LOADING_CART_DETAILS,
  };
};

const setCartsListTotal = (total) => {
  return {
    type: SET_CART_LIST_TOTAL,
    payload: total,
  };
};

const setListCurrentPage = (ids) => {
  return {
    type: SET_CARTS_LIST_CURRENT_PAGE,
    payload: ids,
  };
};

const setDetailsCurrentPage = (ids) => {
  return {
    type: SET_CARTS_DETAILS_CURRENT_PAGE,
    payload: ids,
  };
};

const addListRequest = (req) => {
  return {
    type: ADD_CARTS_LIST_REQUEST,
    payload: req,
  };
};

const addDetailsRequest = (req) => {
  return {
    type: ADD_CART_DETAILS_REQUEST,
    payload: req,
  };
};

export const loadCartsSuccess = (carts) => {
  return {
    type: LOAD_CARTS_SUCCESS,
    payload: {
      items: buildObjectOfItems(carts),
    },
  };
};

const loadCartsFailure = (message) => {
  return {
    type: LOAD_CARTS_FAILURE,
    payload: message,
  };
};

const setCartItemsListTotal = (total) => {
  return {
    type: SET_CART_ITEMS_LIST_TOTAL,
    payload: total,
  };
};

const getCartItemsSuccess = (cartItems) => {
  return {
    type: GET_CART_ITEMS_SUCCESS,
    payload: {
      items: buildObjectOfItems(deleteKeys(cartItems, ['product'])),
    },
  };
};

const getCartItemsFailure = (message) => {
  return {
    type: GET_CART_ITEMS_FAILURE,
    payload: message,
  };
};
