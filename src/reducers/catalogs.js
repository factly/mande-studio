import {
  ADD_CATALOGS_LIST_REQUEST,
  SET_CATALOGS_LIST_CURRENT_PAGE,
  LOADING_CATALOGS,
  LOAD_CATALOGS_SUCCESS,
  SET_CATALOGS_LIST_TOTAL,
  LOAD_CATALOGS_FAILURE,
  CREATING_CATALOG,
  CREATE_CATALOG_SUCCESS,
  CREATE_CATALOG_FAILURE,
  UPDATE_CATALOG_SUCCESS,
  UPDATE_CATALOG_FAILURE,
  DELETE_CATALOG_SUCCESS,
  DELETE_CATALOG_FAILURE,
} from '../constants/catalogs';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

export default function catalogsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_CATALOGS:
      return {
        ...state,
        loading: true,
      };
    case LOAD_CATALOGS_SUCCESS: {
      const { items } = action.payload;
      return {
        ...state,
        loading: false,
        items: { ...state.items, ...items },
      };
    }
    case SET_CATALOGS_LIST_TOTAL:
      return {
        ...state,
        total: action.payload,
      };
    case ADD_CATALOGS_LIST_REQUEST: {
      return {
        ...state,
        req: [...state.req, action.payload],
      };
    }
    case SET_CATALOGS_LIST_CURRENT_PAGE:
      return {
        ...state,
        ids: action.payload,
      };
    case LOAD_CATALOGS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case CREATING_CATALOG:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CATALOG_SUCCESS: {
      const catalog = action.payload;
      return {
        ...state,
        loading: false,
        req: [],
        items: { ...state.items, [catalog.id]: catalog },
        total: state.total + 1,
      };
    }
    case CREATE_CATALOG_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_CATALOG_SUCCESS: {
      const catalog = action.payload;
      return {
        ...state,
        loading: false,
        items: { ...state.items, [catalog.id]: catalog },
      };
    }
    case UPDATE_CATALOG_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case DELETE_CATALOG_SUCCESS: {
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
    case DELETE_CATALOG_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
