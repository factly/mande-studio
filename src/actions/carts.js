import axios from '../utils/axios';
import {
  baseUrl,
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
import { loadProductsSuccess } from './products';
import { loadCurrenciesSuccess } from './currencies';
import { loadProductTypesSuccess } from './product_types';
import { getIds, getValues, deleteKeys, buildObjectOfItems } from '../utils/objects';

export const loadCarts = (page = 1, limit) => {
  return async (dispatch, getState) => {
    let url = baseUrl;
    if (page && limit) {
      url = `${url}?page=${page}&limit=${limit}`;
    }

    dispatch(setListCurrentPage(page));

    const {
      carts: {
        list: { pagination },
      },
    } = getState();

    if (pagination.pages[page]) {
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
      dispatch(loadCartsSuccess(nodes));
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

    dispatch(setDetailsCurrentPage(page));

    const {
      carts: {
        details: { pagination },
      },
    } = getState();

    if (pagination.pages[page]) return;

    dispatch(loadingCartDetails());

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
      dispatch(loadCurrenciesSuccess(currencies));

      const productTypes = getValues(products, 'product_type');
      dispatch(loadProductTypesSuccess(productTypes));

      dispatch(loadProductsSuccess(products));

      dispatch(getCartItemsSuccess(nodes));
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

const setListCurrentPage = (currentPage) => {
  return {
    type: SET_CARTS_LIST_CURRENT_PAGE,
    payload: currentPage,
  };
};

const setDetailsCurrentPage = (currentPage) => {
  return {
    type: SET_CARTS_DETAILS_CURRENT_PAGE,
    payload: currentPage,
  };
};

export const loadCartsSuccess = (carts) => {
  return {
    type: LOAD_CARTS_SUCCESS,
    payload: {
      ids: getIds(carts),
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
      ids: getIds(cartItems),
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
