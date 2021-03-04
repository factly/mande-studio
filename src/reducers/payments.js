import produce from 'immer';
import {
  ADD_PAYMENTS,
  SET_PAYMENT_LOADING,
  SET_PAYMENT_REQUEST,
  SET_PAYMENT_IDS,
} from '../constants/payments';

const initialState = {
  loading: true,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

const paymentsReducer = produce((draft, action = {}) => {
  switch (action.type) {
    case SET_PAYMENT_LOADING:
      draft.loading = action.payload.loading;
      return;
    case ADD_PAYMENTS: {
      const { payments } = action.payload;
      Object.assign(draft.items, payments);
      return;
    }
    case SET_PAYMENT_IDS:
      draft.ids = action.payload.ids;
      return;
    case SET_PAYMENT_REQUEST: {
      const { req, total } = action.payload;
      draft.req.push(req);
      draft.total = total;
      return;
    }
  }
}, initialState);

export default paymentsReducer;
