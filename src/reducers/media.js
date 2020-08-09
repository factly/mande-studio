import produce from 'immer';
import {
  ADD_MEDIUM,
  ADD_MEDIA,
  SET_MEDIUM_LOADING,
  SET_MEDIUM_REQUEST,
  SET_MEDIUM_IDS,
  RESET_MEDIUM,
} from '../constants/media';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

const mediaReducer = produce((draft, action = {}) => {
  switch (action.type) {
    case SET_MEDIUM_LOADING:
      draft.loading = action.payload.loading;
      return;
    case ADD_MEDIUM: {
      const { medium } = action.payload;
      draft.items[medium.id] = medium;
      return;
    }
    case ADD_MEDIA: {
      const { media } = action.payload;
      Object.assign(draft.items, media);
      return;
    }
    case SET_MEDIUM_IDS:
      draft.ids = action.payload.ids;
      return;
    case SET_MEDIUM_REQUEST: {
      const { req, total } = action.payload;
      draft.req.push(req);
      draft.total = total;
      return;
    }
    case RESET_MEDIUM:
      return initialState;
  }
}, initialState);

export default mediaReducer;
