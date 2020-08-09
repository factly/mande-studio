import axios from '../utils/axios';
import {
  ADD_ORDERITEMS,
  SET_ORDERITEM_LOADING,
  SET_ORDERITEM_REQUEST,
  SET_ORDERITEM_IDS,
  ORDERITEM_API,
} from '../constants/orderItems';
import { addProducts } from './products';
import { getIds, getValues, deleteKeys, buildObjectOfItems } from '../utils/objects';

export const loadOrderItems = (id, page = 1, limit = 5) => {
  return async (dispatch, getState) => {
    const {
      orderItems: { req },
    } = getState();

    let ids;
    for (let item of req) {
      if (item.page === page && item.limit === limit) {
        ids = [...item.ids];
      }
    }

    if (ids) {
      dispatch(setOrderItemIds(ids));
      return;
    }

    dispatch(setLoading(true));

    const response = await axios({
      url: `${ORDERITEM_API(id)}?page=${page}&limit=${limit}`,
      method: 'get',
    });

    const { nodes, total } = response.data;
    const currentPageIds = getIds(nodes);
    const currentReq = { id, page: page, limit: limit, ids: currentPageIds };
    dispatch(setOrderItemRequest(currentReq, total));
    dispatch(addOrderItems(nodes));
    dispatch(setOrderItemIds(currentPageIds));

    dispatch(setLoading(false));
  };
};

const setLoading = (loading) => {
  return {
    type: SET_ORDERITEM_LOADING,
    payload: { loading },
  };
};

export const addOrderItems = (orderItems) => (dispatch) => {
  const products = getValues(orderItems, 'product');
  dispatch(addProducts(products));

  dispatch({
    type: ADD_ORDERITEMS,
    payload: {
      orderItems: buildObjectOfItems(deleteKeys(orderItems, ['product'])),
    },
  });
};

const setOrderItemRequest = (req, total) => {
  return {
    type: SET_ORDERITEM_REQUEST,
    payload: { req, total },
  };
};

const setOrderItemIds = (ids) => {
  return {
    type: SET_ORDERITEM_IDS,
    payload: { ids },
  };
};
