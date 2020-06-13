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
  list: { loading: false, ids: [], req: [], items: {}, total: 0 },
};

export default function plansReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_PLANS:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
        },
      };
    case LOAD_PLANS_SUCCESS: {
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
    case SET_PLANS_LIST_TOTAL:
      return {
        ...state,
        list: {
          ...state.list,
          total: action.payload,
        },
      };
    case ADD_PLANS_LIST_REQUEST: {
      const { list } = state;
      return {
        ...state,
        list: {
          ...list,
          req: [...list.req, action.payload],
        },
      };
    }
    case SET_PLANS_LIST_CURRENT_PAGE:
      const { list } = state;
      return {
        ...state,
        list: {
          ...list,
          ids: action.payload,
        },
      };
    case LOAD_PLANS_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
        },
      };
    case CREATING_PLAN:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
        },
      };
    case CREATE_PLAN_SUCCESS: {
      const { list } = state;
      const plan = action.payload;
      return {
        ...state,
        list: {
          ...list,
          loading: false,
          req: [],
          items: { ...list.items, [plan.id]: plan },
          total: list.total + 1,
        },
      };
    }
    case CREATE_PLAN_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
        },
      };
    case UPDATE_PLAN_SUCCESS: {
      const { list } = state;
      const plan = action.payload;
      return {
        ...state,
        list: {
          ...list,
          loading: false,
          items: { ...list.items, [plan.id]: plan },
        },
      };
    }
    case UPDATE_PLAN_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
        },
      };
    case DELETE_PLAN_SUCCESS: {
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
    case DELETE_PLAN_FAILURE:
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
