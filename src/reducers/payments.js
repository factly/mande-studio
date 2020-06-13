import {
  ADD_PAYMENTS_LIST_REQUEST,
  SET_PAYMENTS_LIST_CURRENT_PAGE,
  LOADING_PAYMENTS,
  LOAD_PAYMENTS_SUCCESS,
  LOAD_PAYMENTS_FAILURE,
  SET_PAYMENTS_LIST_TOTAL,
} from '../constants/payments';
import { unique } from '../utils/objects';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

export default function paymentsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_PAYMENTS:
      return {
        ...state,
        loading: true,
      };
    case LOAD_PAYMENTS_SUCCESS: {
      const { items } = action.payload;
      return {
        ...state,
        loading: false,
        items: { ...state.items, ...items },
      };
    }
    case ADD_PAYMENTS_LIST_REQUEST: {
      return {
        ...state,
        req: [...state.req, action.payload],
      };
    }
    case SET_PAYMENTS_LIST_CURRENT_PAGE:
      return {
        ...state,
        ids: action.payload,
      };
    case SET_PAYMENTS_LIST_TOTAL:
      return {
        ...state,
        total: action.payload,
      };
    case LOAD_PAYMENTS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
