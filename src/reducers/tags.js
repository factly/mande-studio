import {
  LOADING_TAGS,
  LOAD_TAGS_SUCCESS,
  LOAD_TAGS_FAILURE,
  CREATING_TAG,
  CREATE_TAG_SUCCESS,
  CREATE_TAG_FAILURE,
  UPDATE_TAG_SUCCESS,
  UPDATE_TAG_FAILURE,
  DELETE_TAG_SUCCESS,
  DELETE_TAG_FAILURE,
} from '../constants/tags';

const initialState = {
  list: { loading: false, items: [], total: 0 },
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
      const { items, total } = action.payload;
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          items,
          total,
        },
      };
    }
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
      return {
        ...state,
        list: {
          ...list,
          loading: false,
          items: [...list.items, action.payload],
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
      const { index, tag } = action.payload;
      const newItems = [...state.list.items];
      newItems.splice(index, 1, tag);
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          items: newItems,
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
      const index = action.payload;
      const newItems = [...list.items];
      newItems.splice(index, 1);
      return {
        ...state,
        list: {
          ...list,
          loading: false,
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
