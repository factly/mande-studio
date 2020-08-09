import produce from 'immer';
import {
  ADD_CURRENCY,
  ADD_CURRENCIES,
  SET_CURRENCY_LOADING,
  SET_CURRENCY_REQUEST,
  SET_CURRENCY_IDS,
  RESET_CURRENCY,
} from '../constants/currencies';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

const currenciesReducer = produce((draft, action = {}) => {
  switch (action.type) {
    case SET_CURRENCY_LOADING:
      draft.loading = action.payload.loading;
      return;
    case ADD_CURRENCY: {
      const { currency } = action.payload;
      draft.items[currency.id] = currency;
      return;
    }
    case ADD_CURRENCIES: {
      const { currencies } = action.payload;
      Object.assign(draft.items, currencies);
      return;
    }
    case SET_CURRENCY_IDS:
      draft.ids = action.payload.ids;
      return;
    case SET_CURRENCY_REQUEST: {
      const { req, total } = action.payload;
      draft.req.push(req);
      draft.total = total;
      return;
    }
    case RESET_CURRENCY:
      return initialState;
  }
}, initialState);

export default currenciesReducer;
