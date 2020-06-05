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
  list: { loading: false, ids: [], items: {}, total: 0 },
};

export default function typesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_PRODUCT_TYPES:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
        },
      };
    case LOAD_PRODUCT_TYPES_SUCCESS: {
      const { ids, items } = action.payload;
      const { list } = state;
      return {
        ...state,
        list: {
          ...list,
          loading: false,
          ids: unique([...list.ids, ids]),
          items: { ...list.items, ...items },
        },
      };
    }
    case SET_PRODUCT_TYPES_LIST_TOTAL: {
      return {
        ...state,
        list: {
          ...state.list,
          total: action.payload,
        },
      };
    }
    case LOAD_PRODUCT_TYPES_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
        },
      };
    case CREATING_PRODUCT_TYPE:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
        },
      };
    case CREATE_PRODUCT_TYPE_SUCCESS: {
      const { list } = state;
      const productType = action.payload;
      return {
        ...state,
        list: {
          ...list,
          loading: false,
          ids: [...list.ids, productType.id],
          items: { ...list.items, [productType.id]: productType },
          total: list.total + 1,
        },
      };
    }
    case CREATE_PRODUCT_TYPE_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
        },
      };
    case UPDATE_PRODUCT_TYPE_SUCCESS: {
      const { list } = state;
      const productType = action.payload;
      return {
        ...state,
        list: {
          ...list,
          loading: false,
          items: { ...list.items, [productType.id]: productType },
        },
      };
    }
    case UPDATE_PRODUCT_TYPE_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
        },
      };
    case DELETE_PRODUCT_TYPE_SUCCESS: {
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
    case DELETE_PRODUCT_TYPE_FAILURE:
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
