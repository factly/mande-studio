import produce from 'immer';
import {
  ADD_FORMAT,
  ADD_FORMATS,
  SET_FORMAT_LOADING,
  SET_FORMAT_REQUEST,
  SET_FORMAT_IDS,
  RESET_FORMAT,
} from '../constants/formats';

const initialState = {
  loading: true,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

const formatsReducer = produce((draft, action = {}) => {
  switch (action.type) {
    case SET_FORMAT_LOADING:
      draft.loading = action.payload.loading;
      return;
    case ADD_FORMAT: {
      const { format } = action.payload;
      draft.items[format.id] = format;
      return;
    }
    case ADD_FORMATS: {
      const { formats } = action.payload;
      Object.assign(draft.items, formats);
      return;
    }
    case SET_FORMAT_IDS:
      draft.ids = action.payload.ids;
      return;
    case SET_FORMAT_REQUEST: {
      const { req, total } = action.payload;
      draft.req.push(req);
      draft.total = total;
      return;
    }
    case RESET_FORMAT:
      return initialState;
  }
}, initialState);

export default formatsReducer;
