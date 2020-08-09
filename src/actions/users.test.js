import * as actions from './users';
import { SET_USERS } from '../constants/users';

describe('formats actions', () => {
  it('should create an action to set users', () => {
    const users = [
      { id: 1, name: 'user 1' },
      { id: 2, name: 'user 2' },
      { id: 3, name: 'user 3' },
    ];
    const setUsersAction = {
      type: SET_USERS,
      payload: {
        ids: [1, 2, 3],
        items: {
          1: { id: 1, name: 'user 1' },
          2: { id: 2, name: 'user 2' },
          3: { id: 3, name: 'user 3' },
        },
      },
    };
    expect(actions.setUsers(users)).toEqual(setUsersAction);
  });
});
