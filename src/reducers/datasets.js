import {
  ADD_DATASETS_LIST_REQUEST,
  SET_DATASETS_LIST_CURRENT_PAGE,
  LOADING_DATASETS,
  LOAD_DATASETS_SUCCESS,
  SET_DATASETS_LIST_TOTAL,
  LOAD_DATASETS_FAILURE,
  CREATING_DATASET,
  CREATE_DATASET_SUCCESS,
  CREATE_DATASET_FAILURE,
  UPDATE_DATASET_SUCCESS,
  UPDATE_DATASET_FAILURE,
  DELETE_DATASET_SUCCESS,
  DELETE_DATASET_FAILURE,
} from '../constants/datasets';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

export default function datasetsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_DATASETS:
      return {
        ...state,
        loading: true,
      };
    case LOAD_DATASETS_SUCCESS: {
      const { items } = action.payload;
      return {
        ...state,
        loading: false,
        items: { ...state.items, ...items },
      };
    }
    case SET_DATASETS_LIST_TOTAL:
      return {
        ...state,
        total: action.payload,
      };
    case ADD_DATASETS_LIST_REQUEST: {
      return {
        ...state,
        req: [...state.req, action.payload],
      };
    }
    case SET_DATASETS_LIST_CURRENT_PAGE:
      return {
        ...state,
        ids: action.payload,
      };
    case LOAD_DATASETS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case CREATING_DATASET:
      return {
        ...state,
        loading: true,
      };
    case CREATE_DATASET_SUCCESS: {
      const dataset = action.payload;
      return {
        ...state,
        loading: false,
        req: [],
        items: { ...state.items, [dataset.id]: dataset },
        total: state.total + 1,
      };
    }
    case CREATE_DATASET_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_DATASET_SUCCESS: {
      const dataset = action.payload;
      return {
        ...state,
        loading: false,
        items: { ...state.items, [dataset.id]: dataset },
      };
    }
    case UPDATE_DATASET_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case DELETE_DATASET_SUCCESS: {
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
    case DELETE_DATASET_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
