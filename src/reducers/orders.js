import {
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
  list: { loading: false, pagination: { currentPage: 0, pages: {} }, items: {}, total: 0 },
  details: {
    loading: false,
    order: {},
    pagination: { currentPage: 0, pages: {} },
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
    case SET_ORDERS_LIST_CURRENT_PAGE:
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
    case SET_ORDER_DETAILS_CURRENT_PAGE:
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
