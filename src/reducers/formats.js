import {
  ADD_FORMATS_LIST_REQUEST,
  SET_FORMATS_LIST_CURRENT_PAGE,
  LOADING_FORMATS,
  LOAD_FORMATS_SUCCESS,
  SET_FORMATS_LIST_TOTAL,
  LOAD_FORMATS_FAILURE,
  CREATING_FORMAT,
  CREATE_FORMAT_SUCCESS,
  CREATE_FORMAT_FAILURE,
  UPDATE_FORMAT_SUCCESS,
  UPDATE_FORMAT_FAILURE,
  DELETE_FORMAT_SUCCESS,
  DELETE_FORMAT_FAILURE,
} from '../constants/formats';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

export default function formatsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_FORMATS:
      return {
        ...state,
        loading: true,
      };
    case LOAD_FORMATS_SUCCESS: {
      const { items } = action.payload;
      return {
        ...state,
        loading: false,
        items: { ...state.items, ...items },
      };
    }
    case SET_FORMATS_LIST_TOTAL:
      return {
        ...state,
        total: action.payload,
      };
    case ADD_FORMATS_LIST_REQUEST: {
      return {
        ...state,
        req: [...state.req, action.payload],
      };
    }
    case SET_FORMATS_LIST_CURRENT_PAGE:
      return {
        ...state,
        ids: action.payload,
      };
    case LOAD_FORMATS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case CREATING_FORMAT:
      return {
        ...state,
        loading: true,
      };
    case CREATE_FORMAT_SUCCESS: {
      const format = action.payload;
      return {
        ...state,
        loading: false,
        req: [],
        items: { ...state.items, [format.id]: format },
        total: state.total + 1,
      };
    }
    case CREATE_FORMAT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_FORMAT_SUCCESS: {
      const format = action.payload;
      return {
        ...state,
        loading: false,
        items: { ...state.items, [format.id]: format },
      };
    }
    case UPDATE_FORMAT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case DELETE_FORMAT_SUCCESS: {
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
    case DELETE_FORMAT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
