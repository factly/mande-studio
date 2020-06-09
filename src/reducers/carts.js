import {
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
  list: { loading: false, pagination: { currentPage: 0, pages: {} }, items: {}, total: 0 },
  details: { loading: false, pagination: { currentPage: 0, pages: {} }, items: {}, total: 0 },
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
      const { currentPage } = list.pagination;
      return {
        ...state,
        list: {
          ...list,
          loading: false,
          items: { ...list.items, ...items },
          pagination: {
            ...list.pagination,
            pages: {
              ...list.pagination.pages,
              [currentPage]: ids,
            },
          },
        },
      };
    }
    case SET_CARTS_LIST_CURRENT_PAGE:
      const { list } = state;
      return {
        ...state,
        list: {
          ...list,
          pagination: {
            ...list.pagination,
            currentPage: action.payload,
          },
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
      const { items, ids } = action.payload;
      const { details } = state;
      const { pagination } = details;
      return {
        ...state,
        details: {
          ...details,
          loading: false,
          items: { ...details.items, ...items },
          pagination: {
            ...pagination,
            pages: {
              ...pagination.pages,
              [pagination.currentPage]: ids,
            },
          },
        },
      };
    }
    case SET_CARTS_DETAILS_CURRENT_PAGE:
      const { details } = state;
      return {
        ...state,
        details: {
          ...details,
          pagination: {
            ...details.pagination,
            currentPage: action.payload,
          },
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
