import {
  ADD_CARTS_LIST_REQUEST,
  ADD_CART_DETAILS_REQUEST,
  LOADING_CARTS,
  LOADING_CART_DETAILS,
  SET_CART_LIST_TOTAL,
  SET_CARTS_LIST_CURRENT_PAGE,
  LOAD_CARTS_SUCCESS,
  LOAD_CARTS_FAILURE,
  GET_CART_ITEMS_SUCCESS,
  SET_CART_ITEMS_LIST_TOTAL,
  SET_CARTS_DETAILS_CURRENT_PAGE,
  GET_CART_ITEMS_FAILURE,
} from '../constants/carts';
import { unique } from '../utils/objects';

const initialState = {
  list: { loading: false, ids: [], req: [], items: {}, total: 0 },
  details: { loading: false, ids: [], req: [], items: {}, total: 0 },
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
      const { items } = action.payload;
      const { list } = state;
      return {
        ...state,
        list: {
          ...list,
          loading: false,
          items: { ...list.items, ...items },
        },
      };
    }
    case ADD_CARTS_LIST_REQUEST: {
      const { list } = state;
      return {
        ...state,
        list: {
          ...list,
          req: [...list.req, action.payload],
        },
      };
    }
    case SET_CARTS_LIST_CURRENT_PAGE:
      const { list } = state;
      return {
        ...state,
        list: {
          ...list,
          ids: action.payload,
        },
      };
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
      const { items } = action.payload;
      const { details } = state;
      return {
        ...state,
        details: {
          ...details,
          loading: false,
          items: { ...details.items, ...items },
        },
      };
    }
    case ADD_CART_DETAILS_REQUEST: {
      const { details } = state;
      return {
        ...state,
        details: {
          ...details,
          req: [...details.req, action.payload],
        },
      };
    }
    case SET_CARTS_DETAILS_CURRENT_PAGE:
      const { details } = state;
      return {
        ...state,
        details: {
          ...details,
          ids: action.payload,
        },
      };
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
