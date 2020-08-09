import axios from '../utils/axios';
import {
  ADD_CARTITEMS,
  SET_CARTITEM_LOADING,
  SET_CARTITEM_REQUEST,
  SET_CARTITEM_IDS,
  CARTITEM_API,
} from '../constants/cartItems';
import { addProducts } from './products';
import { getIds, getValues, deleteKeys, buildObjectOfItems } from '../utils/objects';

export const loadCartItems = (id, page = 1, limit = 5) => {
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
      url: `${CARTITEM_API(id)}?page=${page}&limit=${limit}`,
      method: 'get',
    });

    const { nodes, total } = response.data;
    const currentPageIds = getIds(nodes);
    const currentReq = { id, page: page, limit: limit, ids: currentPageIds };
    dispatch(setCartItemRequest(currentReq, total));
    dispatch(addCartItems(nodes));
    dispatch(setCartItemIds(currentPageIds));

    dispatch(setLoading(false));
  };
};

const setLoading = (loading) => {
  return {
    type: SET_CARTITEM_LOADING,
    payload: { loading },
  };
};

export const addCartItems = (cartItems) => (dispatch) => {
  const products = getValues(cartItems, 'product');
  dispatch(addProducts(products));

  dispatch({
    type: ADD_CARTITEMS,
    payload: {
      cartItems: buildObjectOfItems(deleteKeys(cartItems, ['product'])),
    },
  });
};

const setCartItemRequest = (req, total) => {
  return {
    type: SET_CARTITEM_REQUEST,
    payload: { req, total },
  };
};

const setCartItemIds = (ids) => {
  return {
    type: SET_CARTITEM_IDS,
    payload: { ids },
  };
};
