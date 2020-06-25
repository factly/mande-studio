import {
  ADD_MEDIA_LIST_REQUEST,
  SET_MEDIA_LIST_CURRENT_PAGE,
  LOADING_MEDIA,
  LOAD_MEDIA_SUCCESS,
  SET_MEDIA_LIST_TOTAL,
  LOAD_MEDIA_FAILURE,
  GET_MEDIUM_SUCCESS,
  GET_MEDIUM_FAILURE,
  CREATING_MEDIUM,
  CREATE_MEDIUM_SUCCESS,
  CREATE_MEDIUM_FAILURE,
  UPDATE_MEDIUM_SUCCESS,
  UPDATE_MEDIUM_FAILURE,
  DELETE_MEDIUM_SUCCESS,
  DELETE_MEDIUM_FAILURE,
} from '../constants/media';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  details: {},
  medium: {},
  total: 0,
};

export default function mediaReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_MEDIA:
      return {
        ...state,
        loading: true,
      };
    case LOAD_MEDIA_SUCCESS: {
      const { items } = action.payload;
      return {
        ...state,
        loading: false,
        items: { ...state.items, ...items },
      };
    }
    case SET_MEDIA_LIST_TOTAL:
      return {
        ...state,
        total: action.payload,
      };
    case ADD_MEDIA_LIST_REQUEST: {
      return {
        ...state,
        req: [...state.req, action.payload],
      };
    }
    case SET_MEDIA_LIST_CURRENT_PAGE:
      return {
        ...state,
        ids: action.payload,
      };
    case LOAD_MEDIA_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case GET_MEDIUM_SUCCESS:
      return {
        ...state,
        medium: action.payload,
      };
    case GET_MEDIUM_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case CREATING_MEDIUM:
      return {
        ...state,
        loading: true,
      };
    case CREATE_MEDIUM_SUCCESS: {
      const medium = action.payload;
      return {
        ...state,
        loading: false,
        req: [],
        items: { ...state.items, [medium.id]: medium },
        total: state.total + 1,
      };
    }
    case CREATE_MEDIUM_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_MEDIUM_SUCCESS: {
      const medium = action.payload;
      return {
        ...state,
        loading: false,
        medium: {},
        items: { ...state.items, [medium.id]: medium },
      };
    }
    case UPDATE_MEDIUM_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case DELETE_MEDIUM_SUCCESS: {
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
    case DELETE_MEDIUM_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
