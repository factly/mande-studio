import {
  LOADING_CARTS,
  LOADING_CART_DETAILS,
  SET_CART_LIST_TOTAL,
  LOAD_CARTS_SUCCESS,
  LOAD_CARTS_FAILURE,
  GET_CART_ITEMS_SUCCESS,
  SET_CART_ITEMS_LIST_TOTAL,
  GET_CART_ITEMS_FAILURE,
} from '../constants/carts';
import { unique } from '../utils/objects';

const initialState = {
  list: { loading: false, ids: [], items: {}, total: 0 },
  details: { loading: false, ids: [], items: {}, total: 0 },
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
      const { ids, items } = action.payload;
      const { list } = state;
      return {
        ...state,
        list: {
          ...list,
          loading: false,
          ids: unique([...list.ids, ...ids]),
          items,
        },
      };
    }
    case SET_CART_LIST_TOTAL:
      return {
        ...state,
        list: {
          ...state.list,
          total: action.payload,
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
    case GET_CART_ITEMS_SUCCESS: {
      const { items, ids } = action.payload;
      return {
        ...state,
        details: {
          ...state.details,
          loading: false,
          ids,
          items,
        },
      };
    }
    case SET_CART_ITEMS_LIST_TOTAL: {
      return {
        ...state,
        details: {
          ...state.details,
          total: action.payload,
        },
      };
    }
    default:
      return state;
  }
}
