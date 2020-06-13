import {
  ADD_CATEGORIES_LIST_REQUEST,
  SET_CATEGORIES_LIST_CURRENT_PAGE,
  LOADING_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_FAILURE,
  SET_CATEGORIES_LIST_TOTAL,
  CREATING_CATEGORY,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
} from '../constants/categories';
import { unique } from '../utils/objects';

const initialState = {
  list: { loading: false, ids: [], req: [], items: {}, total: 0 },
};

export default function categoriesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_CATEGORIES:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
        },
      };
    case LOAD_CATEGORIES_SUCCESS: {
      const { items } = action.payload;
      const { list } = state;
      return {
        ...state,
        list: {
          ...list,
          loading: false,
          items: { ...list.items, ...items },
        },
      };
    }
    case SET_CATEGORIES_LIST_TOTAL:
      return {
        ...state,
        list: {
          ...state.list,
          total: action.payload,
        },
      };
    case ADD_CATEGORIES_LIST_REQUEST: {
      const { list } = state;
      return {
        ...state,
        list: {
          ...list,
          req: [...list.req, action.payload],
        },
      };
    }
    case SET_CATEGORIES_LIST_CURRENT_PAGE:
      const { list } = state;
      return {
        ...state,
        list: {
          ...list,
          ids: action.payload,
        },
      };
    case LOAD_CATEGORIES_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
        },
      };
    case CREATING_CATEGORY:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
        },
      };
    case CREATE_CATEGORY_SUCCESS: {
      const { list } = state;
      const category = action.payload;
      return {
        ...state,
        list: {
          ...list,
          loading: false,
          req: [],
          items: { ...list.items, [category.id]: category },
          total: list.total + 1,
        },
      };
    }
    case CREATE_CATEGORY_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
        },
      };
    case UPDATE_CATEGORY_SUCCESS: {
      const category = action.payload;
      const { list } = state;

      return {
        ...state,
        list: {
          ...list,
          loading: false,
          items: { ...list.items, [category.id]: category },
        },
      };
    }
    case UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
        },
      };
    case DELETE_CATEGORY_SUCCESS: {
      const { list } = state;
      const id = action.payload;
      const newItems = { ...list.items };
      delete newItems[id];
      return {
        ...state,
        list: {
          ...list,
          loading: false,
          req: [],
          ids: [],
          items: newItems,
          total: list.total - 1,
        },
      };
    }
    case DELETE_CATEGORY_FAILURE:
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
