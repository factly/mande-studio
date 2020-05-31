import {
  LOADING_MEMBERSHIPS,
  LOAD_MEMBERSHIPS_SUCCESS,
  LOAD_MEMBERSHIPS_FAILURE,
} from '../constants/memberships';

const initialState = {
  list: { loading: false, items: [], total: 0 },
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
