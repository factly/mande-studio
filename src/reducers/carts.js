import produce from 'immer';
import { ADD_CARTS, SET_CART_LOADING, SET_CART_REQUEST, SET_CART_IDS } from '../constants/carts';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

const cartsReducer = produce((draft, action = {}) => {
  switch (action.type) {
    case SET_CART_LOADING:
      draft.loading = action.payload.loading;
      return;
    case ADD_CARTS: {
      const { carts } = action.payload;
      Object.assign(draft.items, carts);
      return;
    }
    case SET_CART_IDS:
      draft.ids = action.payload.ids;
      return;
    case SET_CART_REQUEST: {
      const { req, total } = action.payload;
      draft.req.push(req);
      draft.total = total;
      return;
    }
  }
}, initialState);

export default cartsReducer;
