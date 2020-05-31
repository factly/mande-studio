import axios from '../utils/axios';
import {
  baseUrl,
  LOADING_PRODUCT_TYPES,
  LOAD_PRODUCT_TYPES_SUCCESS,
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
      dispatch(loadProductTypesSuccess(response.data));
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

export const updateProductType = (id, data, index) => {
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
      dispatch(updateProductTypeSuccess(index, response.data));
    }
  };
};

export const deleteProductType = (id, index) => {
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
      dispatch(deleteProductTypeSuccess(index));
    }
  };
};

const loadingProductTypes = () => {
  return {
    type: LOADING_PRODUCT_TYPES,
  };
};

const loadProductTypesSuccess = (data) => {
  return {
    type: LOAD_PRODUCT_TYPES_SUCCESS,
    payload: {
      items: data.nodes,
      total: data.total,
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

const createProductTypeSuccess = (product_type) => {
  return {
    type: CREATE_PRODUCT_TYPE_SUCCESS,
    payload: product_type,
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

const updateProductTypeSuccess = (index, product_type) => {
  return {
    type: UPDATE_PRODUCT_TYPE_SUCCESS,
    payload: { index, product_type },
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

const deleteProductTypeSuccess = (index) => {
  return {
    type: DELETE_PRODUCT_TYPE_SUCCESS,
    payload: index,
  };
};

const deleteProductTypeFailure = (message) => {
  return {
    type: DELETE_PRODUCT_TYPE_FAILURE,
    payload: message,
  };
};
