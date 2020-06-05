import {
  LOADING_PAYMENTS,
  LOAD_PAYMENTS_SUCCESS,
  LOAD_PAYMENTS_FAILURE,
  SET_PAYMENTS_LIST_TOTAL,
} from '../constants/payments';
import { unique } from '../utils/objects';

const initialState = {
  list: { loading: false, ids: [], items: {}, total: 0 },
};

export default function paymentsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_PAYMENTS:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
        },
      };
    case LOAD_PAYMENTS_SUCCESS: {
      const { ids, items } = action.payload;
      const { list } = state;
      return {
        ...state,
        list: {
          ...list,
          loading: false,
          ids: unique([...list.ids, ...ids]),
          items,
        },
      };
    }
    case SET_PAYMENTS_LIST_TOTAL:
      return {
        ...state,
        list: {
          ...state.list,
          total: action.payload,
        },
      };
    case LOAD_PAYMENTS_FAILURE:
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
