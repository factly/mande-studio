import {
  LOADING_PRODUCT_TYPES,
  LOAD_PRODUCT_TYPES_SUCCESS,
  SET_PRODUCT_TYPES_LIST_TOTAL,
  LOAD_PRODUCT_TYPES_FAILURE,
  CREATING_PRODUCT_TYPE,
  CREATE_PRODUCT_TYPE_SUCCESS,
  CREATE_PRODUCT_TYPE_FAILURE,
  UPDATE_PRODUCT_TYPE_SUCCESS,
  UPDATE_PRODUCT_TYPE_FAILURE,
  DELETE_PRODUCT_TYPE_SUCCESS,
  DELETE_PRODUCT_TYPE_FAILURE,
} from '../constants/product_types';
import { unique } from '../utils/objects';

const initialState = {
  loading: false,
  ids: [],
  items: {},
  total: 0,
};

export default function typesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_PRODUCT_TYPES:
      return {
        ...state,
        loading: true,
      };
    case LOAD_PRODUCT_TYPES_SUCCESS: {
      const { ids, items } = action.payload;
      return {
        ...state,
        loading: false,
        ids: unique([...state.ids, ...ids]),
        items: { ...state.items, ...items },
      };
    }
    case SET_PRODUCT_TYPES_LIST_TOTAL: {
      return {
        ...state,
        total: action.payload,
      };
    }
    case LOAD_PRODUCT_TYPES_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case CREATING_PRODUCT_TYPE:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PRODUCT_TYPE_SUCCESS: {
      const productType = action.payload;
      return {
        ...state,
        loading: false,
        ids: [...state.ids, productType.id],
        items: { ...state.items, [productType.id]: productType },
        total: state.total + 1,
      };
    }
    case CREATE_PRODUCT_TYPE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_PRODUCT_TYPE_SUCCESS: {
      const productType = action.payload;
      return {
        ...state,
        loading: false,
        items: { ...state.items, [productType.id]: productType },
      };
    }
    case UPDATE_PRODUCT_TYPE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case DELETE_PRODUCT_TYPE_SUCCESS: {
      const id = action.payload;
      const index = state.ids.indexOf(id);
      const newIds = [...state.ids];
      newIds.splice(index, 1);
      const newItems = { ...state.items };
      delete newItems[id];
      return {
        ...state,
        loading: false,
        ids: newIds,
        items: newItems,
        total: state.total - 1,
      };
    }
    case DELETE_PRODUCT_TYPE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
