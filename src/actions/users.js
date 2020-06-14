import { SET_USERS } from '../constants/users';
import { getIds, buildObjectOfItems } from '../utils/objects';

export const setUsers = (users) => {
  return {
    type: SET_USERS,
    payload: {
      ids: getIds(users),
      items: buildObjectOfItems(users),
    },
  };
};
