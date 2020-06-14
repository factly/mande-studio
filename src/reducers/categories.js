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
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

export default function categoriesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_CATEGORIES:
      return {
        ...state,
        loading: true,
      };
    case LOAD_CATEGORIES_SUCCESS: {
      const { items } = action.payload;
      return {
        ...state,
        loading: false,
        items: { ...state.items, ...items },
      };
    }
    case SET_CATEGORIES_LIST_TOTAL:
      return {
        ...state,
        total: action.payload,
      };
    case ADD_CATEGORIES_LIST_REQUEST: {
      return {
        ...state,
        req: [...state.req, action.payload],
      };
    }
    case SET_CATEGORIES_LIST_CURRENT_PAGE:
      return {
        ...state,
        ids: action.payload,
      };
    case LOAD_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case CREATING_CATEGORY:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CATEGORY_SUCCESS: {
      const category = action.payload;
      return {
        ...state,
        loading: false,
        req: [],
        items: { ...state.items, [category.id]: category },
        total: state.total + 1,
      };
    }
    case CREATE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_CATEGORY_SUCCESS: {
      const category = action.payload;

      return {
        ...state,
        loading: false,
        items: { ...state.items, [category.id]: category },
      };
    }
    case UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case DELETE_CATEGORY_SUCCESS: {
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
    case DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
