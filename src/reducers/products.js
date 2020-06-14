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

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
  product: {},
};

export default function productsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_PRODUCTS:
      return {
        ...state,
        loading: true,
      };
    case LOAD_PRODUCTS_SUCCESS: {
      const { items } = action.payload;
      return {
        ...state,
        loading: false,
        items: { ...state.items, ...items },
      };
    }
    case SET_PRODUCTS_LIST_TOTAL: {
      return {
        ...state,
        total: action.payload,
      };
    }
    case ADD_PRODUCTS_LIST_REQUEST: {
      return {
        ...state,
        req: [...state.req, action.payload],
      };
    }
    case SET_PRODUCTS_LIST_CURRENT_PAGE:
      return {
        ...state,
        ids: action.payload,
      };
    case LOAD_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case LOADING_PRODUCT_DETAILS:
      return {
        ...state,
        product: {},
        loading: true,
      };
    case GET_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case GET_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case CREATING_PRODUCT:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PRODUCT_SUCCESS: {
      const product = action.payload;

      return {
        ...state,
        loading: false,
        req: [],
        items: { ...state.items, [product.id]: product },
        total: state.total + 1,
      };
    }
    case CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_PRODUCT_SUCCESS: {
      const product = action.payload;

      return {
        ...state,
        loading: false,
        items: { ...state.items, [product.id]: product },
      };
    }
    case UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case DELETE_PRODUCT_SUCCESS: {
      const id = action.payload;
      const newItems = { ...state.items };
      delete newItems[id];
      return {
        ...state,
        loading: false,
        req: [],
        ids: [],
        items: newItems,
        total: state.total - 1,
      };
    }
    case DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
