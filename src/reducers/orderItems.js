import produce from 'immer';
import {
  ADD_ORDERITEMS,
  SET_ORDERITEM_LOADING,
  SET_ORDERITEM_REQUEST,
  SET_ORDERITEM_IDS,
} from '../constants/orderItems';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

const orderItemsReducer = produce((draft, action = {}) => {
  switch (action.type) {
    case SET_ORDERITEM_LOADING:
      draft.loading = action.payload.loading;
      return;
    case ADD_ORDERITEMS: {
      const { orderItems } = action.payload;
      Object.assign(draft.items, orderItems);
      return;
    }
    case SET_ORDERITEM_IDS:
      draft.ids = action.payload.ids;
      return;
    case SET_ORDERITEM_REQUEST: {
      const { req, total } = action.payload;
      draft.req.push(req);
      draft.total = total;
      return;
    }
  }
}, initialState);

export default orderItemsReducer;
