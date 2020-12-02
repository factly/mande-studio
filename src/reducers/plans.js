import produce from 'immer';
import {
  ADD_PLAN,
  ADD_PLANS,
  SET_PLAN_LOADING,
  SET_PLAN_REQUEST,
  SET_PLAN_IDS,
  RESET_PLAN,
} from '../constants/plans';

const initialState = {
  loading: true,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

const plansReducer = produce((draft, action = {}) => {
  switch (action.type) {
    case SET_PLAN_LOADING:
      draft.loading = action.payload.loading;
      return;
    case ADD_PLAN: {
      const { plan } = action.payload;
      draft.items[plan.id] = plan;
      return;
    }
    case ADD_PLANS: {
      const { plans } = action.payload;
      Object.assign(draft.items, plans);
      return;
    }
    case SET_PLAN_IDS:
      draft.ids = action.payload.ids;
      return;
    case SET_PLAN_REQUEST: {
      const { req, total } = action.payload;
      draft.req.push(req);
      draft.total = total;
      return;
    }
    case RESET_PLAN:
      return initialState;
  }
}, initialState);

export default plansReducer;
