import {
  LOADING_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_FAILURE,
  CREATING_CATEGORY,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
} from '../constants/categories';

const initialState = {
  list: { loading: false, items: [] },
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
    case LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          items: action.payload,
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
      return {
        ...state,
        list: {
          ...list,
          loading: false,
          items: [...list.items, action.payload],
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
      const { index, category } = action.payload;
      const newItems = [...state.list.items];
      newItems.splice(index, 1, category);
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          items: newItems,
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
      const index = action.payload;
      const newItems = [...state.list.items];
      newItems.splice(index, 1);
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          items: newItems,
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
