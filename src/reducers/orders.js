import {
  ADD_ORDERS_LIST_REQUEST,
  ADD_ORDER_DETAILS_REQUEST,
  LOADING_ORDERS,
  LOADING_ORDER_DETAILS,
  LOADING_ORDER_ITEMS,
  SET_ORDERS_LIST_TOTAL,
  SET_ORDERS_LIST_CURRENT_PAGE,
  LOAD_ORDERS_SUCCESS,
  LOAD_ORDERS_FAILURE,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILURE,
  SET_ORDER_ITEMS_LIST_TOTAL,
  SET_ORDER_DETAILS_CURRENT_PAGE,
  GET_ORDER_ITEMS_SUCCESS,
  GET_ORDER_ITEMS_FAILURE,
} from '../constants/orders';

const initialState = {
  list: { loading: false, ids: [], req: [], items: {}, total: 0 },
  details: {
    loading: false,
    order: {},
    ids: [],
    req: [],
    items: {},
    total: 0,
  },
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
    case LOAD_ORDERS_SUCCESS: {
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
    case ADD_ORDERS_LIST_REQUEST: {
      const { list } = state;
      return {
        ...state,
        list: {
          ...list,
          req: [...list.req, action.payload],
        },
      };
    }
    case SET_ORDERS_LIST_CURRENT_PAGE:
      const { list } = state;
      return {
        ...state,
        list: {
          ...list,
          ids: action.payload,
        },
      };
    case SET_ORDERS_LIST_TOTAL:
      return {
        ...state,
        list: {
          ...state.list,
          total: action.payload,
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
    case GET_ORDER_ITEMS_SUCCESS: {
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
    case ADD_ORDER_DETAILS_REQUEST: {
      const { details } = state;
      return {
        ...state,
        details: {
          ...details,
          req: [...details.req, action.payload],
        },
      };
    }
    case SET_ORDER_DETAILS_CURRENT_PAGE:
      const { details } = state;
      return {
        ...state,
        details: {
          ...details,
          ids: action.payload,
        },
      };
    case SET_ORDER_ITEMS_LIST_TOTAL: {
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
