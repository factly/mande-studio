import axios from '../utils/axios';
import {
  ADD_TAG,
  ADD_TAGS,
  SET_TAG_LOADING,
  SET_TAG_REQUEST,
  SET_TAG_IDS,
  RESET_TAG,
  TAG_API,
} from '../constants/tags';
import { getIds, buildObjectOfItems } from '../utils/objects';

export const loadTags = (page = 1, limit = 5) => {
  return async (dispatch, getState) => {
    const {
      tags: { req },
    } = getState();

    let ids;
    for (let item of req) {
      if (item.page === page && item.limit === limit) {
        ids = [...item.ids];
      }
    }

    if (ids) {
      dispatch(setTagIds(ids));
      return;
    }

    dispatch(setLoading(true));

    const response = await axios({
      url: `${TAG_API}?page=${page}&limit=${limit}`,
      method: 'get',
    });

    const { nodes, total } = response.data;
    const currentPageIds = getIds(nodes);
    const currentReq = { page: page, limit: limit, ids: currentPageIds };
    dispatch(setTagRequest(currentReq, total));
    dispatch(addTags(nodes));
    dispatch(setTagIds(currentPageIds));

    dispatch(setLoading(false));
  };
};

export const createTag = (data) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));

    await axios({
      url: TAG_API,
      method: 'post',
      data: data,
    });

    dispatch(resetTag());
    dispatch(setLoading(false));
  };
};

export const updateTag = (id, data) => {
  return async (dispatch, getState) => {
    let url = `${TAG_API}/${id}`;

    dispatch(setLoading(true));

    const response = await axios({
      url: url,
      method: 'put',
      data: data,
    });

    dispatch(addTag(response.data));
    dispatch(setLoading(false));
  };
};

export const deleteTag = (id) => {
  return async (dispatch, getState) => {
    let url = `${TAG_API}/${id}`;

    dispatch(setLoading(true));

    await axios({
      url: url,
      method: 'delete',
    });

    dispatch(resetTag());
    dispatch(setLoading(false));
  };
};

export const getTag = (id) => {
  return async (dispatch, getState) => {
    const {
      tags: { items },
    } = getState();

    if (items[id]) {
      return;
    }

    dispatch(setLoading(true));

    const response = await axios({
      url: `${TAG_API}/${id}`,
      method: 'get',
    });
    dispatch(addTag(response.data));

    dispatch(setLoading(false));
  };
};

const setLoading = (loading) => {
  return {
    type: SET_TAG_LOADING,
    payload: { loading },
  };
};

const addTag = (tag) => {
  return {
    type: ADD_TAG,
    payload: { tag },
  };
};

export const addTags = (tags) => {
  return {
    type: ADD_TAGS,
    payload: {
      tags: buildObjectOfItems(tags),
    },
  };
};

const setTagRequest = (req, total) => {
  return {
    type: SET_TAG_REQUEST,
    payload: { req, total },
  };
};

const setTagIds = (ids) => {
  return {
    type: SET_TAG_IDS,
    payload: { ids },
  };
};

const resetTag = () => {
  return {
    type: RESET_TAG,
  };
};
