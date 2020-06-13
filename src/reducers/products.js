import {
  ADD_PRODUCTS_LIST_REQUEST,
  SET_PRODUCTS_LIST_CURRENT_PAGE,
  LOADING_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
  SET_PRODUCTS_LIST_TOTAL,
  LOAD_PRODUCTS_FAILURE,
  CREATING_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  LOADING_PRODUCT_DETAILS,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAILURE,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
} from '../constants/products';
import { unique } from '../utils/objects';

const initialState = {
  list: { loading: false, ids: [], req: [], items: {}, total: 0 },
  details: { loading: false, product: {} },
};

export default function productsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_PRODUCTS:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
        },
      };
    case LOAD_PRODUCTS_SUCCESS: {
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
    case SET_PRODUCTS_LIST_TOTAL: {
      return {
        ...state,
        list: {
          ...state.list,
          total: action.payload,
        },
      };
    }
    case ADD_PRODUCTS_LIST_REQUEST: {
      const { list } = state;
      return {
        ...state,
        list: {
          ...list,
          req: [...list.req, action.payload],
        },
      };
    }
    case SET_PRODUCTS_LIST_CURRENT_PAGE:
      const { list } = state;
      return {
        ...state,
        list: {
          ...list,
          ids: action.payload,
        },
      };
    case LOAD_PRODUCTS_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
        },
      };
    case LOADING_PRODUCT_DETAILS:
      return {
        ...state,
        details: {
          ...state.details,
          product: {},
          loading: true,
        },
      };
    case GET_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        details: {
          ...state.details,
          loading: false,
        },
      };
    case GET_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        details: {
          ...state.details,
          loading: false,
          product: action.payload,
        },
      };
    case CREATING_PRODUCT:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
        },
      };
    case CREATE_PRODUCT_SUCCESS: {
      const { list } = state;
      const product = action.payload;

      return {
        ...state,
        list: {
          ...list,
          loading: false,
          req: [],
          items: { ...list.items, [product.id]: product },
          total: list.total + 1,
        },
      };
    }
    case CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
        },
      };
    case UPDATE_PRODUCT_SUCCESS: {
      const product = action.payload;
      const { list } = state;

      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          items: { ...list.items, [product.id]: product },
        },
      };
    }
    case UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
        },
      };
    case DELETE_PRODUCT_SUCCESS: {
      const { list } = state;
      const id = action.payload;
      const newItems = { ...list.items };
      delete newItems[id];
      return {
        ...state,
        list: {
          ...list,
          loading: false,
          req: [],
          ids: [],
          items: newItems,
          total: list.total - 1,
        },
      };
    }
    case DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
        },
      };
    default:
      return state;
  }
}
