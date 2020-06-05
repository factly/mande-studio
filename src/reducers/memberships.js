import {
  LOADING_MEMBERSHIPS,
  LOAD_MEMBERSHIPS_SUCCESS,
  LOAD_MEMBERSHIPS_FAILURE,
  SET_MEMBERSHIPS_LIST_TOTAL,
} from '../constants/memberships';

const initialState = {
  list: { loading: false, ids: [], items: {}, total: 0 },
};

export default function membershipsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_MEMBERSHIPS:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
        },
      };
    case LOAD_MEMBERSHIPS_SUCCESS: {
      const { ids, items } = action.payload;
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          ids,
          items,
        },
      };
    }
    case SET_MEMBERSHIPS_LIST_TOTAL:
      return {
        ...state,
        list: {
          ...state.list,
          total: action.payload,
        },
      };
    case LOAD_MEMBERSHIPS_FAILURE:
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
