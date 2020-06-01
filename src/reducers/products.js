import {
  LOADING_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
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

const initialState = {
  list: { loading: false, items: [], total: 0 },
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
          product: {},
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
