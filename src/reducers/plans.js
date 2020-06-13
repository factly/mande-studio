import {
  ADD_PLANS_LIST_REQUEST,
  SET_PLANS_LIST_CURRENT_PAGE,
  LOADING_PLANS,
  LOAD_PLANS_SUCCESS,
  SET_PLANS_LIST_TOTAL,
  LOAD_PLANS_FAILURE,
  CREATING_PLAN,
  CREATE_PLAN_SUCCESS,
  CREATE_PLAN_FAILURE,
  UPDATE_PLAN_SUCCESS,
  UPDATE_PLAN_FAILURE,
  DELETE_PLAN_SUCCESS,
  DELETE_PLAN_FAILURE,
} from '../constants/plans';
import { unique } from '../utils/objects';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

export default function plansReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_PLANS:
      return {
        ...state,
        loading: true,
      };
    case LOAD_PLANS_SUCCESS: {
      const { items } = action.payload;
      return {
        ...state,
        loading: false,
        items: { ...state.items, ...items },
      };
    }
    case SET_PLANS_LIST_TOTAL:
      return {
        ...state,
        total: action.payload,
      };
    case ADD_PLANS_LIST_REQUEST: {
      return {
        ...state,
        req: [...state.req, action.payload],
      };
    }
    case SET_PLANS_LIST_CURRENT_PAGE:
      return {
        ...state,
        ids: action.payload,
      };
    case LOAD_PLANS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case CREATING_PLAN:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PLAN_SUCCESS: {
      const plan = action.payload;
      return {
        ...state,
        loading: false,
        req: [],
        items: { ...state.items, [plan.id]: plan },
        total: state.total + 1,
      };
    }
    case CREATE_PLAN_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_PLAN_SUCCESS: {
      const plan = action.payload;
      return {
        ...state,
        loading: false,
        items: { ...state.items, [plan.id]: plan },
      };
    }
    case UPDATE_PLAN_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case DELETE_PLAN_SUCCESS: {
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
    case DELETE_PLAN_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
