import { SET_USERS } from '../constants/users';
import { unique } from '../utils/objects';

const initialState = {
  list: { ids: [], items: {} },
};

export default function usersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_USERS:
      const { ids, items } = action.payload;
      const { list } = state;
      return {
        ...state,
        list: {
          ...list,
          ids: unique([...list.ids, ...ids]),
          items,
        },
      };
    default:
      return state;
  }
}
