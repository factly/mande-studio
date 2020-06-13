import axios from '../utils/axios';
import {
  baseUrl,
  ADD_MEMBERSHIPS_LIST_REQUEST,
  LOADING_MEMBERSHIPS,
  LOAD_MEMBERSHIPS_SUCCESS,
  SET_MEMBERSHIPS_LIST_TOTAL,
  SET_MEMEBERSHIPS_LIST_CURRENT_PAGE,
  LOAD_MEMBERSHIPS_FAILURE,
} from '../constants/memberships';
import { loadPlansSuccess } from './plans';
import { loadPaymentsSuccess } from './payments';
import { loadCurrenciesSuccess } from './currencies';
import { setUsers } from './users';
import { getIds, getValues, deleteKeys, buildObjectOfItems } from '../utils/objects';

export const loadMemberships = (page = 1, limit) => {
  return async (dispatch, getState) => {
    let url = baseUrl;
    if (page && limit) {
      url = `${url}?page=${page}&limit=${limit}`;
    }

    const {
      memberships: {
        list: { req },
      },
    } = getState();

    let found = false;
    let ids;
    for (let item of req) {
      if (item.page === page && item.limit === limit) {
        ids = [...item.ids];
        found = true;
      }
    }

    if (found) {
      dispatch(setListCurrentPage(ids));
      return;
    }

    dispatch(loadingMemberships());

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(loadMembershipsFailure(error.message));
    });

    if (response) {
      const { nodes, total } = response.data;

      const plans = getValues(nodes, 'plan');
      dispatch(loadPlansSuccess(plans));

      const payments = getValues(nodes, 'payment');
      const currencies = getValues(payments, 'currency');
      dispatch(loadCurrenciesSuccess(currencies));
      dispatch(loadPaymentsSuccess(payments));

      const users = getValues(nodes, 'user');
      dispatch(setUsers(users));

      const currentPageIds = getIds(nodes);
      const req = { page: page, limit: limit, ids: currentPageIds };
      dispatch(addListRequest(req));
      dispatch(loadMembershipsSuccess(nodes));
      dispatch(setListCurrentPage(currentPageIds));
      dispatch(setMembershipListTotal(total));
    }
  };
};

const loadingMemberships = () => {
  return {
    type: LOADING_MEMBERSHIPS,
  };
};

const setMembershipListTotal = (total) => {
  return {
    type: SET_MEMBERSHIPS_LIST_TOTAL,
    payload: total,
  };
};

const setListCurrentPage = (ids) => {
  return {
    type: SET_MEMEBERSHIPS_LIST_CURRENT_PAGE,
    payload: ids,
  };
};

const addListRequest = (req) => {
  return {
    type: ADD_MEMBERSHIPS_LIST_REQUEST,
    payload: req,
  };
};

const loadMembershipsSuccess = (memberships) => {
  return {
    type: LOAD_MEMBERSHIPS_SUCCESS,
    payload: {
      items: buildObjectOfItems(deleteKeys(memberships, ['plan', 'payment', 'user'])),
    },
  };
};

const loadMembershipsFailure = (message) => {
  return {
    type: LOAD_MEMBERSHIPS_FAILURE,
    payload: message,
  };
};
