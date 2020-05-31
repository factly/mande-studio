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
  list: { loading: false, items: [], total: 0 },
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
