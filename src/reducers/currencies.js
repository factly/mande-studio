import {
  LOADING_CURRENCIES,
  LOAD_CURRENCIES_SUCCESS,
  LOAD_CURRENCIES_FAILURE,
  CREATING_CURRENCY,
  CREATE_CURRENCY_SUCCESS,
  CREATE_CURRENCY_FAILURE,
  UPDATE_CURRENCY_SUCCESS,
  UPDATE_CURRENCY_FAILURE,
  DELETE_CURRENCY_SUCCESS,
  DELETE_CURRENCY_FAILURE,
} from '../constants/currencies';

const initialState = {
  list: { loading: false, items: [], total: 0 },
};

export default function currenciesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_CURRENCIES:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
        },
      };
    case LOAD_CURRENCIES_SUCCESS: {
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
    case LOAD_CURRENCIES_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
        },
      };
    case CREATING_CURRENCY:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
        },
      };
    case CREATE_CURRENCY_SUCCESS: {
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
    case CREATE_CURRENCY_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
        },
      };
    case UPDATE_CURRENCY_SUCCESS: {
      const { index, currency } = action.payload;
      const newItems = [...state.list.items];
      newItems.splice(index, 1, currency);
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          items: newItems,
        },
      };
    }
    case UPDATE_CURRENCY_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
        },
      };
    case DELETE_CURRENCY_SUCCESS: {
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
    case DELETE_CURRENCY_FAILURE:
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
