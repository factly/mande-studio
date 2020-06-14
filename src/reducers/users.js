import { SET_USERS } from '../constants/users';
import { unique } from '../utils/objects';

const initialState = {
  ids: [],
  items: {},
};

export default function usersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_USERS:
      const { ids, items } = action.payload;
      return {
        ...state,
        ids: unique([...state.ids, ...ids]),
        items,
      };
    default:
      return state;
  }
}
