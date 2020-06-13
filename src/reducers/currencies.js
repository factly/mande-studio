import {
  ADD_CURRENCIES_LIST_REQUEST,
  SET_CURRENCIES_LIST_CURRENT_PAGE,
  LOADING_CURRENCIES,
  LOAD_CURRENCIES_SUCCESS,
  SET_CURRENCIES_LIST_TOTAL,
  LOAD_CURRENCIES_FAILURE,
  CREATING_CURRENCY,
  CREATE_CURRENCY_SUCCESS,
  CREATE_CURRENCY_FAILURE,
  UPDATE_CURRENCY_SUCCESS,
  UPDATE_CURRENCY_FAILURE,
  DELETE_CURRENCY_SUCCESS,
  DELETE_CURRENCY_FAILURE,
} from '../constants/currencies';
import { unique } from '../utils/objects';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

export default function currenciesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_CURRENCIES:
      return {
        ...state,
        loading: true,
      };
    case LOAD_CURRENCIES_SUCCESS: {
      const { ids, items } = action.payload;
      return {
        ...state,
        loading: false,
        items: { ...state.items, ...items },
      };
    }
    case SET_CURRENCIES_LIST_TOTAL:
      return {
        ...state,
        total: action.payload,
      };
    case ADD_CURRENCIES_LIST_REQUEST: {
      return {
        ...state,
        req: [...state.req, action.payload],
      };
    }
    case SET_CURRENCIES_LIST_CURRENT_PAGE:
      return {
        ...state,
        ids: action.payload,
      };
    case LOAD_CURRENCIES_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case CREATING_CURRENCY:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CURRENCY_SUCCESS: {
      const currency = action.payload;
      return {
        ...state,
        loading: false,
        req: [],
        items: { ...state.items, [currency.id]: currency },
        total: state.total + 1,
      };
    }
    case CREATE_CURRENCY_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_CURRENCY_SUCCESS: {
      const currency = action.payload;
      return {
        ...state,
        loading: false,
        items: { ...state.items, [currency.id]: currency },
      };
    }
    case UPDATE_CURRENCY_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case DELETE_CURRENCY_SUCCESS: {
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
    case DELETE_CURRENCY_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
