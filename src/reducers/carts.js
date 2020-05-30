import {
  LOADING_CARTS,
  LOADING_CART_DETAILS,
  LOAD_CARTS_SUCCESS,
  LOAD_CARTS_FAILURE,
  GET_CART_ITEMS_SUCCESS,
  GET_CART_ITEMS_FAILURE,
} from '../constants/carts';

const initialState = {
  list: { loading: false, items: [] },
  details: { loading: false, items: [] },
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
    case LOAD_CARTS_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          items: [...action.payload],
        },
      };
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
    case GET_CART_ITEMS_SUCCESS:
      return {
        ...state,
        details: {
          ...state.details,
          loading: false,
          items: [...action.payload],
        },
      };
    default:
      return state;
  }
}
