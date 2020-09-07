import reducer from './users';
import * as types from '../constants/users';

const initialState = {
  ids: [],
  items: {},
};

describe('users reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should return the state for default case', () => {
    expect(
      reducer({
        items: { 1: { id: 1, name: 'user 1' } },
        ids: [1],
      }),
    ).toEqual({
      items: { 1: { id: 1, name: 'user 1' } },
      ids: [1],
    });
  });
  it('should handle SET_USERS', () => {
    expect(
      reducer(initialState, {
        type: types.SET_USERS,
        payload: {
          ids: [1, 2],
          items: { 1: { id: 1, name: 'user 1' }, 2: { id: 2, name: 'user 2' } },
        },
      }),
    ).toEqual({
      ids: [1, 2],
      items: { 1: { id: 1, name: 'user 1' }, 2: { id: 2, name: 'user 2' } },
    });
  });
  it('should handle SET_USERS when ids already exists', () => {
    expect(
      reducer(
        {
          ids: [1, 2],
          items: {},
        },
        {
          type: types.SET_USERS,
          payload: {
            ids: [2, 3],
            items: {},
          },
        },
      ),
    ).toEqual({
      ids: [1, 2, 3],
      items: {},
    });
  });
  it('should handle SET_USERS when items already exists', () => {
    expect(
      reducer(
        {
          ids: [],
          items: { 1: { id: 1, name: 'user 1' }, 2: { id: 2, name: 'user 2' } },
        },
        {
          type: types.SET_USERS,
          payload: {
            ids: [],
            items: { 2: { id: 2, name: 'user 2' }, 3: { id: 3, name: 'user 3' } },
          },
        },
      ),
    ).toEqual({
      ids: [],
      items: {
        1: { id: 1, name: 'user 1' },
        2: { id: 2, name: 'user 2' },
        3: { id: 3, name: 'user 3' },
      },
    });
  });
});
