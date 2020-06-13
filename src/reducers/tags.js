import {
  LOADING_TAGS,
  LOAD_TAGS_SUCCESS,
  SET_TAGS_LIST_TOTAL,
  ADD_TAGS_LIST_REQUEST,
  SET_TAGS_LIST_CURRENT_PAGE,
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
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

export default function tagsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_TAGS:
      return {
        ...state,
        loading: true,
      };
    case LOAD_TAGS_SUCCESS: {
      const { items } = action.payload;
      return {
        ...state,
        loading: false,
        items: { ...state.items, ...items },
      };
    }
    case ADD_TAGS_LIST_REQUEST: {
      return {
        ...state,
        req: [...state.req, action.payload],
      };
    }
    case SET_TAGS_LIST_CURRENT_PAGE:
      return {
        ...state,
        ids: action.payload,
      };
    case SET_TAGS_LIST_TOTAL:
      return {
        ...state,
        total: action.payload,
      };
    case LOAD_TAGS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case CREATING_TAG:
      return {
        ...state,
        loading: true,
      };
    case CREATE_TAG_SUCCESS: {
      const tag = action.payload;
      return {
        ...state,
        loading: false,
        req: [],
        items: { ...state.items, [tag.id]: tag },
        total: state.total + 1,
      };
    }
    case CREATE_TAG_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_TAG_SUCCESS: {
      const tag = action.payload;

      return {
        ...state,
        loading: false,
        items: { ...state.items, [tag.id]: tag },
      };
    }
    case UPDATE_TAG_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case DELETE_TAG_SUCCESS: {
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
    case DELETE_TAG_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
