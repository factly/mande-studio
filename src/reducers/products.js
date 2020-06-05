import {
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
  list: { loading: false, ids: [], items: {}, total: 0 },
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
      const { items, ids } = action.payload;
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
    case SET_PRODUCTS_LIST_TOTAL: {
      return {
        ...state,
        list: {
          ...state.list,
          total: action.payload,
        },
      };
    }
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
          ids: [...list.ids, product.id],
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
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
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
      const index = list.ids.indexOf(id);
      const newIds = [...list.ids];
      newIds.splice(index, 1);
      const newItems = { ...list.items };
      delete newItems[id];
      return {
        ...state,
        list: {
          ...list,
          loading: false,
          ids: newIds,
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
