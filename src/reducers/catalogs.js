import produce from 'immer';
import {
  ADD_CATALOG,
  ADD_CATALOGS,
  SET_CATALOG_LOADING,
  SET_CATALOG_REQUEST,
  SET_CATALOG_IDS,
  RESET_CATALOG,
} from '../constants/catalogs';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

const catalogsReducer = produce((draft, action = {}) => {
  switch (action.type) {
    case SET_CATALOG_LOADING:
      draft.loading = action.payload.loading;
      return;
    case ADD_CATALOG: {
      const { catalog } = action.payload;
      draft.items[catalog.id] = catalog;
      return;
    }
    case ADD_CATALOGS: {
      const { catalogs } = action.payload;
      Object.assign(draft.items, catalogs);
      return;
    }
    case SET_CATALOG_IDS:
      draft.ids = action.payload.ids;
      return;
    case SET_CATALOG_REQUEST: {
      const { req, total } = action.payload;
      draft.req.push(req);
      draft.total = total;
      return;
    }
    case RESET_CATALOG:
      return initialState;
  }
}, initialState);

export default catalogsReducer;
