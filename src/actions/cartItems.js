import axios from '../utils/axios';
import {
  ADD_CARTITEMS,
  SET_CARTITEM_LOADING,
  SET_CARTITEM_REQUEST,
  SET_CARTITEM_IDS,
  CARTITEM_API,
} from '../constants/cartItems';
import { addProducts } from './products';
import { addMemberships } from './memberships';
import { getIds, getValues, deleteKeys, buildObjectOfItems } from '../utils/objects';

export const loadCartItems = (page = 1, limit = 5) => {
  return async (dispatch, getState) => {
    const {
      cartItems: { req },
    } = getState();

    let ids;
    for (let item of req) {
      if (item.page === page && item.limit === limit) {
        ids = [...item.ids];
      }
    }

    if (ids) {
      dispatch(setCartItemIds(ids));
      return;
    }

    dispatch(setLoading(true));

    const response = await axios({
      url: `${CARTITEM_API}?page=${page}&limit=${limit}`,
      method: 'get',
    });

    const { nodes, total } = response.data;
    const currentPageIds = getIds(nodes);
    const currentReq = { page: page, limit: limit, ids: currentPageIds };
    dispatch(setCartItemRequest(currentReq, total));
    dispatch(addCartItems(nodes));
    dispatch(setCartItemIds(currentPageIds));

    dispatch(setLoading(false));
  };
};

export const setLoading = (loading) => {
  return {
    type: SET_CARTITEM_LOADING,
    payload: { loading },
  };
};

export const addCartItems = (cartItems) => (dispatch) => {
  const products = getValues(cartItems, 'product');
  dispatch(addProducts(products));

  const memberships = getValues(cartItems, 'membership');
  dispatch(addMemberships(memberships));

  dispatch({
    type: ADD_CARTITEMS,
    payload: {
      cartItems: buildObjectOfItems(deleteKeys(cartItems, ['product', 'membership'])),
    },
  });
};

export const setCartItemRequest = (req, total) => {
  return {
    type: SET_CARTITEM_REQUEST,
    payload: { req, total },
  };
};

export const setCartItemIds = (ids) => {
  return {
    type: SET_CARTITEM_IDS,
    payload: { ids },
  };
};
