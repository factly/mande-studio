import {
  LOADING_PAYMENTS,
  LOAD_PAYMENTS_SUCCESS,
  LOAD_PAYMENTS_FAILURE,
} from '../constants/payments';

const initialState = {
  list: { loading: false, items: [] },
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
    case LOAD_PAYMENTS_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          items: action.payload,
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
