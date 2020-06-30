import produce from 'immer';
import {
  ADD_TAG,
  ADD_TAGS,
  SET_TAG_LOADING,
  SET_TAG_REQUEST,
  SET_TAG_IDS,
  RESET_TAG,
} from '../constants/tags';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

const tagsReducer = produce((draft, action = {}) => {
  switch (action.type) {
    case SET_TAG_LOADING:
      draft.loading = action.payload.loading;
      return;
    case ADD_TAG: {
      const { tag } = action.payload;
      draft.items[tag.id] = tag;
      return;
    }
    case ADD_TAGS: {
      const { tags } = action.payload;
      Object.assign(draft.items, tags);
      return;
    }
    case SET_TAG_IDS:
      draft.ids = action.payload.ids;
      return;
    case SET_TAG_REQUEST: {
      const { req, total } = action.payload;
      draft.req.push(req);
      draft.total = total;
      return;
    }
    case RESET_TAG:
      return initialState;
  }
}, initialState);

export default tagsReducer;
