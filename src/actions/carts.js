import axios from '../utils/axios';
import {
  baseUrl,
  LOADING_CARTS,
  LOADING_CART_DETAILS,
  LOAD_CARTS_SUCCESS,
  LOAD_CARTS_FAILURE,
  GET_CART_ITEMS_SUCCESS,
  GET_CART_ITEMS_FAILURE,
} from '../constants/carts';

export const loadCarts = (page, limit) => {
  return async (dispatch, getState) => {
    let url = baseUrl;
    if (page && limit) {
      url = `${url}?page=${page}&limit=${limit}`;
    }

    dispatch(loadingCarts());

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(loadCartsFailure(error.message));
    });

    if (response) {
      dispatch(loadCartsSuccess(response.data.nodes));
    }
  };
};

export const getCartItems = (id, page, limit) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}/items`;
    if (page && limit) {
      url = `${url}?page=${page}&limit=${limit}`;
    }

    dispatch(loadingCartDetails());

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(getCartItemsFailure(error.message));
    });

    if (response) {
      dispatch(getCartItemsSuccess(response.data.nodes));
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

const loadCartsSuccess = (carts) => {
  return {
    type: LOAD_CARTS_SUCCESS,
    payload: carts,
  };
};

const loadCartsFailure = (message) => {
  return {
    type: LOAD_CARTS_FAILURE,
    payload: message,
  };
};

const getCartItemsSuccess = (cartItems) => {
  return {
    type: GET_CART_ITEMS_SUCCESS,
    payload: cartItems,
  };
};

const getCartItemsFailure = (message) => {
  return {
    type: GET_CART_ITEMS_FAILURE,
    payload: message,
  };
};