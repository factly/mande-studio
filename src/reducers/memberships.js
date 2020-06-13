import {
  ADD_MEMBERSHIPS_LIST_REQUEST,
  LOADING_MEMBERSHIPS,
  LOAD_MEMBERSHIPS_SUCCESS,
  LOAD_MEMBERSHIPS_FAILURE,
  SET_MEMBERSHIPS_LIST_TOTAL,
  SET_MEMEBERSHIPS_LIST_CURRENT_PAGE,
} from '../constants/memberships';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

export default function membershipsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_MEMBERSHIPS:
      return {
        ...state,
        loading: true,
      };
    case LOAD_MEMBERSHIPS_SUCCESS: {
      const { items } = action.payload;
      return {
        ...state,
        loading: false,
        items: { ...state.items, ...items },
      };
    }
    case SET_MEMBERSHIPS_LIST_TOTAL:
      return {
        ...state,
        total: action.payload,
      };
    case ADD_MEMBERSHIPS_LIST_REQUEST: {
      return {
        ...state,
        req: [...state.req, action.payload],
      };
    }
    case SET_MEMEBERSHIPS_LIST_CURRENT_PAGE:
      return {
        ...state,
        ids: action.payload,
      };
    case LOAD_MEMBERSHIPS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
