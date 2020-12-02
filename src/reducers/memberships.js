import produce from 'immer';
import {
  ADD_MEMBERSHIP,
  ADD_MEMBERSHIPS,
  SET_MEMBERSHIP_LOADING,
  SET_MEMBERSHIP_REQUEST,
  SET_MEMBERSHIP_IDS,
  RESET_MEMBERSHIP,
} from '../constants/memberships';

const initialState = {
  loading: true,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

const membershipsReducer = produce((draft, action = {}) => {
  switch (action.type) {
    case SET_MEMBERSHIP_LOADING:
      draft.loading = action.payload.loading;
      return;
    case ADD_MEMBERSHIP: {
      const { membership } = action.payload;
      draft.items[membership.id] = membership;
      return;
    }
    case ADD_MEMBERSHIPS: {
      const { memberships } = action.payload;
      Object.assign(draft.items, memberships);
      return;
    }
    case SET_MEMBERSHIP_IDS:
      draft.ids = action.payload.ids;
      return;
    case SET_MEMBERSHIP_REQUEST: {
      const { req, total } = action.payload;
      draft.req.push(req);
      draft.total = total;
      return;
    }
    case RESET_MEMBERSHIP:
      return initialState;
  }
}, initialState);

export default membershipsReducer;
