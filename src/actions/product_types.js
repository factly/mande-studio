import axios from '../utils/axios';
import {
  baseUrl,
  LOADING_PRODUCT_TYPES,
  LOAD_PRODUCT_TYPES_SUCCESS,
  SET_PRODUCT_TYPES_LIST_TOTAL,
  LOAD_PRODUCT_TYPES_FAILURE,
  CREATING_PRODUCT_TYPE,
  CREATE_PRODUCT_TYPE_SUCCESS,
  CREATE_PRODUCT_TYPE_FAILURE,
  UPDATING_PRODUCT_TYPE,
  UPDATE_PRODUCT_TYPE_SUCCESS,
  UPDATE_PRODUCT_TYPE_FAILURE,
  DELETING_PRODUCT_TYPE,
  DELETE_PRODUCT_TYPE_SUCCESS,
  DELETE_PRODUCT_TYPE_FAILURE,
} from '../constants/product_types';
import { getIds, buildObjectOfItems } from '../utils/objects';

export const loadProductTypes = (page, limit) => {
  return async (dispatch, getState) => {
    let url = baseUrl;
    if (page && limit) {
      url = `${url}?page=${page}&limit=${limit}`;
    }

    dispatch(loadingProductTypes());

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(loadProductTypesFailure(error.message));
    });

    if (response) {
      const { nodes, total } = response.data;
      dispatch(loadProductTypesSuccess(nodes));
      dispatch(setProductTypesListTotal(total));
    }
  };
};

export const createProductType = (data) => {
  return async (dispatch, getState) => {
    dispatch(creatingProductType());

    const response = await axios({
      url: baseUrl,
      method: 'post',
      data: data,
    }).catch((error) => {
      dispatch(createProductTypeFailure(error.message));
    });

    if (response) {
      dispatch(createProductTypeSuccess(response.data));
    }
  };
};

export const updateProductType = (id, data) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}`;

    dispatch(updatingProductType());

    const response = await axios({
      url: url,
      method: 'put',
      data: data,
    }).catch((error) => {
      dispatch(updateProductTypeFailure(error.message));
    });

    if (response) {
      dispatch(updateProductTypeSuccess(response.data));
    }
  };
};

export const deleteProductType = (id) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}`;

    dispatch(deletingProductType());

    const response = await axios({
      url: url,
      method: 'delete',
    }).catch((error) => {
      dispatch(deleteProductTypeFailure(error.message));
    });

    if (response) {
      dispatch(deleteProductTypeSuccess(id));
    }
  };
};

const loadingProductTypes = () => {
  return {
    type: LOADING_PRODUCT_TYPES,
  };
};

const setProductTypesListTotal = (total) => {
  return {
    type: SET_PRODUCT_TYPES_LIST_TOTAL,
    total,
  };
};

export const loadProductTypesSuccess = (productTypes) => {
  return {
    type: LOAD_PRODUCT_TYPES_SUCCESS,
    payload: {
      ids: getIds(productTypes),
      items: buildObjectOfItems(productTypes),
    },
  };
};

const loadProductTypesFailure = (message) => {
  return {
    type: LOAD_PRODUCT_TYPES_FAILURE,
    payload: message,
  };
};

const creatingProductType = () => {
  return {
    type: CREATING_PRODUCT_TYPE,
  };
};

const createProductTypeSuccess = (productType) => {
  return {
    type: CREATE_PRODUCT_TYPE_SUCCESS,
    payload: productType,
  };
};

const createProductTypeFailure = (message) => {
  return {
    type: CREATE_PRODUCT_TYPE_FAILURE,
    payload: message,
  };
};

const updatingProductType = () => {
  return {
    type: UPDATING_PRODUCT_TYPE,
  };
};

const updateProductTypeSuccess = (productType) => {
  return {
    type: UPDATE_PRODUCT_TYPE_SUCCESS,
    payload: productType,
  };
};

const updateProductTypeFailure = (message) => {
  return {
    type: UPDATE_PRODUCT_TYPE_FAILURE,
    payload: message,
  };
};

const deletingProductType = () => {
  return {
    type: DELETING_PRODUCT_TYPE,
  };
};

const deleteProductTypeSuccess = (id) => {
  return {
    type: DELETE_PRODUCT_TYPE_SUCCESS,
    payload: id,
  };
};

const deleteProductTypeFailure = (message) => {
  return {
    type: DELETE_PRODUCT_TYPE_FAILURE,
    payload: message,
  };
};
