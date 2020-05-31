import {
  LOADING_CARTS,
  LOADING_CART_DETAILS,
  LOAD_CARTS_SUCCESS,
  LOAD_CARTS_FAILURE,
  GET_CART_ITEMS_SUCCESS,
  GET_CART_ITEMS_FAILURE,
} from '../constants/carts';

const initialState = {
  list: { loading: false, items: [], total: 0 },
  details: { loading: false, items: [], total: 0 },
};

export default function cartsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_CARTS:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
        },
      };
    case LOAD_CARTS_SUCCESS: {
      const { items, total } = action.payload;
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          items,
          total,
        },
      };
    }
    case LOAD_CARTS_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
        },
      };
    case LOADING_CART_DETAILS:
      return {
        ...state,
        details: {
          ...state.details,
          loading: true,
        },
      };
    case GET_CART_ITEMS_FAILURE:
      return {
        ...state,
        details: {
          ...state.details,
          loading: false,
        },
      };
    case GET_CART_ITEMS_SUCCESS: {
      const { items, total } = action.payload;
      return {
        ...state,
        details: {
          ...state.details,
          loading: false,
          items,
          total,
        },
      };
    }
    default:
      return state;
  }
}
