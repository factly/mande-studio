import produce from 'immer';
import {
  ADD_ORDER,
  ADD_ORDERS,
  SET_ORDER_LOADING,
  SET_ORDER_REQUEST,
  SET_ORDER_IDS,
} from '../constants/orders';

const initialState = {
  loading: true,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

const ordersReducer = produce((draft, action = {}) => {
  switch (action.type) {
    case SET_ORDER_LOADING:
      draft.loading = action.payload.loading;
      return;
    case ADD_ORDER: {
      const { order } = action.payload;
      draft.items[order.id] = order;
      return;
    }
    case ADD_ORDERS: {
      const { orders } = action.payload;
      Object.assign(draft.items, orders);
      return;
    }
    case SET_ORDER_IDS:
      draft.ids = action.payload.ids;
      return;
    case SET_ORDER_REQUEST: {
      const { req, total } = action.payload;
      draft.req.push(req);
      draft.total = total;
      return;
    }
  }
}, initialState);

export default ordersReducer;
