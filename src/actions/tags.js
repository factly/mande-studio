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

export const loadTags = (query) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));

    const response = await axios({
      url: TAG_API,
      method: 'get',
      params: query
    });

    const { nodes, total } = response.data;
    const currentPageIds = getIds(nodes);
    const currentReq = { ...query, ids: currentPageIds };
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

export const setLoading = (loading) => {
  return {
    type: SET_TAG_LOADING,
    payload: { loading },
  };
};

export const addTag = (tag) => {
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

export const setTagRequest = (req, total) => {
  return {
    type: SET_TAG_REQUEST,
    payload: { req, total },
  };
};

export const setTagIds = (ids) => {
  return {
    type: SET_TAG_IDS,
    payload: { ids },
  };
};

export const resetTag = () => {
  return {
    type: RESET_TAG,
  };
};
