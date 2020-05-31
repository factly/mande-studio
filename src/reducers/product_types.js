import {
  LOADING_PRODUCT_TYPES,
  LOAD_PRODUCT_TYPES_SUCCESS,
  LOAD_PRODUCT_TYPES_FAILURE,
  CREATING_PRODUCT_TYPE,
  CREATE_PRODUCT_TYPE_SUCCESS,
  CREATE_PRODUCT_TYPE_FAILURE,
  UPDATE_PRODUCT_TYPE_SUCCESS,
  UPDATE_PRODUCT_TYPE_FAILURE,
  DELETE_PRODUCT_TYPE_SUCCESS,
  DELETE_PRODUCT_TYPE_FAILURE,
} from '../constants/product_types';

const initialState = {
  list: { loading: false, items: [], total: 0 },
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
      return {
        ...state,
        list: {
          ...list,
          loading: false,
          items: [...list.items, action.payload],
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
      const { index, product_type } = action.payload;
      const newItems = [...state.list.items];
      newItems.splice(index, 1, product_type);
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          items: newItems,
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
      const index = action.payload;
      const newItems = [...list.items];
      newItems.splice(index, 1);
      return {
        ...state,
        list: {
          ...list,
          loading: false,
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
