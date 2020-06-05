import {
  LOADING_TAGS,
  LOAD_TAGS_SUCCESS,
  SET_TAGS_LIST_TOTAL,
  LOAD_TAGS_FAILURE,
  CREATING_TAG,
  CREATE_TAG_SUCCESS,
  CREATE_TAG_FAILURE,
  UPDATE_TAG_SUCCESS,
  UPDATE_TAG_FAILURE,
  DELETE_TAG_SUCCESS,
  DELETE_TAG_FAILURE,
} from '../constants/tags';
import { unique } from '../utils/objects';

const initialState = {
  list: { loading: false, ids: [], items: {}, total: 0 },
};

export default function tagsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_TAGS:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
        },
      };
    case LOAD_TAGS_SUCCESS: {
      const { ids, items } = action.payload;
      const { list } = state;
      return {
        ...state,
        list: {
          ...list,
          loading: false,
          ids: unique([...list.ids, ids]),
          items: { ...list.items, ...items },
        },
      };
    }
    case SET_TAGS_LIST_TOTAL:
      return {
        ...state,
        list: {
          ...state.list,
          total: action.payload,
        },
      };
    case LOAD_TAGS_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
        },
      };
    case CREATING_TAG:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
        },
      };
    case CREATE_TAG_SUCCESS: {
      const { list } = state;
      const tag = action.payload;
      return {
        ...state,
        list: {
          ...list,
          loading: false,
          ids: [...list.ids, tag.id],
          items: { ...list.items, [tag.id]: tag },
          total: list.total + 1,
        },
      };
    }
    case CREATE_TAG_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
        },
      };
    case UPDATE_TAG_SUCCESS: {
      const tag = action.payload;
      const { list } = state;

      return {
        ...state,
        list: {
          ...list,
          loading: false,
          items: { ...list.items, [tag.id]: tag },
        },
      };
    }
    case UPDATE_TAG_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
        },
      };
    case DELETE_TAG_SUCCESS: {
      const { list } = state;
      const id = action.payload;
      const index = list.ids.indexOf(id);
      const newIds = [...list.ids];
      newIds.splice(index, 1);
      const newItems = { ...list.items };
      delete newItems[id];
      return {
        ...state,
        list: {
          ...list,
          loading: false,
          ids: newIds,
          items: newItems,
          total: list.total - 1,
        },
      };
    }
    case DELETE_TAG_FAILURE:
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
