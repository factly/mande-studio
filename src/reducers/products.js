import produce from 'immer';
import {
  ADD_PRODUCT,
  ADD_PRODUCTS,
  SET_PRODUCT_LOADING,
  SET_PRODUCT_REQUEST,
  SET_PRODUCT_IDS,
  RESET_PRODUCT,
} from '../constants/products';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

const productsReducer = produce((draft, action = {}) => {
  switch (action.type) {
    case SET_PRODUCT_LOADING:
      draft.loading = action.payload.loading;
      return;
    case ADD_PRODUCT: {
      const { product } = action.payload;
      draft.items[product.id] = product;
      return;
    }
    case ADD_PRODUCTS: {
      const { products } = action.payload;
      Object.assign(draft.items, products);
      return;
    }
    case SET_PRODUCT_IDS:
      console.log(action);
      draft.ids = action.payload.ids;
      return;
    case SET_PRODUCT_REQUEST: {
      const { req, total } = action.payload;
      draft.req.push(req);
      draft.total = total;
      return;
    }
    case RESET_PRODUCT:
      return initialState;
  }
}, initialState);

export default productsReducer;
