import axios from '../utils/axios';
import {
  ADD_CARTS,
  SET_CART_LOADING,
  SET_CART_REQUEST,
  SET_CART_IDS,
  CART_API,
} from '../constants/carts';
import { getIds, buildObjectOfItems } from '../utils/objects';

export const loadCarts = (page = 1, limit = 5) => {
  return async (dispatch, getState) => {
    const {
      carts: { req },
    } = getState();

    let ids;
    for (let item of req) {
      if (item.page === page && item.limit === limit) {
        ids = [...item.ids];
      }
    }

    if (ids) {
      dispatch(setCartIds(ids));
      return;
    }

    dispatch(setLoading(true));

    const response = await axios({
      url: `${CART_API}?page=${page}&limit=${limit}`,
      method: 'get',
    });

    const { nodes, total } = response.data;
    const currentPageIds = getIds(nodes);
    const currentReq = { page: page, limit: limit, ids: currentPageIds };
    dispatch(setCartRequest(currentReq, total));
    dispatch(addCarts(nodes));
    dispatch(setCartIds(currentPageIds));

    dispatch(setLoading(false));
  };
};

export const setLoading = (loading) => {
  return {
    type: SET_CART_LOADING,
    payload: { loading },
  };
};

export const addCarts = (carts) => {
  return {
    type: ADD_CARTS,
    payload: {
      carts: buildObjectOfItems(carts),
    },
  };
};

export const setCartRequest = (req, total) => {
  return {
    type: SET_CART_REQUEST,
    payload: { req, total },
  };
};

export const setCartIds = (ids) => {
  return {
    type: SET_CART_IDS,
    payload: { ids },
  };
};
