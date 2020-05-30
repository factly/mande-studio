import {
  LOADING_ORDERS,
  LOADING_ORDER_DETAILS,
  LOADING_ORDER_ITEMS,
  LOAD_ORDERS_SUCCESS,
  LOAD_ORDERS_FAILURE,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILURE,
  GET_ORDER_ITEMS_SUCCESS,
  GET_ORDER_ITEMS_FAILURE,
} from '../constants/orders';

const initialState = {
  list: { loading: false, items: [] },
  details: { loading: false, order: {}, items: [] },
};

export default function ordersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_ORDERS:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
        },
      };
    case LOAD_ORDERS_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          items: [...action.payload],
        },
      };
    case LOAD_ORDERS_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
        },
      };
    case LOADING_ORDER_DETAILS:
      return {
        ...state,
        details: {
          ...state.details,
          loading: true,
        },
      };
    case GET_ORDER_DETAILS_FAILURE:
      return {
        ...state,
        details: {
          ...state.details,
          loading: false,
        },
      };
    case GET_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        details: {
          ...state.details,
          loading: false,
          order: action.payload,
        },
      };
    case LOADING_ORDER_ITEMS:
      return {
        ...state,
        details: {
          ...state.details,
          loading: true,
        },
      };
    case GET_ORDER_ITEMS_FAILURE:
      return {
        ...state,
        details: {
          ...state.details,
          loading: false,
        },
      };
    case GET_ORDER_ITEMS_SUCCESS:
      return {
        ...state,
        details: {
          ...state.details,
          loading: false,
          items: [...action.payload],
        },
      };
    default:
      return state;
  }
}
