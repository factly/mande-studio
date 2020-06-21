import axios from '../utils/axios';
import {
  baseUrl,
  ADD_CATALOGS_LIST_REQUEST,
  SET_CATALOGS_LIST_CURRENT_PAGE,
  GET_CATALOG_SUCCESS,
  GET_CATALOG_FAILURE,
  LOADING_CATALOGS,
  LOAD_CATALOGS_SUCCESS,
  SET_CATALOGS_LIST_TOTAL,
  LOAD_CATALOGS_FAILURE,
  CREATING_CATALOG,
  CREATE_CATALOG_SUCCESS,
  CREATE_CATALOG_FAILURE,
  UPDATING_CATALOG,
  UPDATE_CATALOG_SUCCESS,
  UPDATE_CATALOG_FAILURE,
  DELETING_CATALOG,
  DELETE_CATALOG_SUCCESS,
  DELETE_CATALOG_FAILURE,
} from '../constants/catalogs';
import { loadProductsSuccess } from './products';
import { getIds, buildObjectOfItems, getValues } from '../utils/objects';

export const loadCatalogs = (page, limit) => {
  return async (dispatch, getState) => {
    let url = baseUrl;
    if (page && limit) {
      url = `${url}?page=${page}&limit=${limit}`;
    }

    const {
      catalogs: { req },
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

    dispatch(loadingCatalogs());

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(loadCatalogsFailure(error.message));
    });

    if (response) {
      const { nodes, total } = response.data;
      const currentPageIds = getIds(nodes);
      const req = { page: page, limit: limit, ids: currentPageIds };

      const products = getValues(nodes, 'products').filter((product) => product);
      products && dispatch(loadProductsSuccess(products));

      nodes.forEach((catalog) => {
        catalog.products = getIds(catalog.products || []);
      });

      dispatch(addListRequest(req));
      dispatch(loadCatalogsSuccess(nodes));
      dispatch(setListCurrentPage(currentPageIds));
      dispatch(setCatalogsListTotal(total));
    }
  };
};

export const createCatalog = (data) => {
  return async (dispatch, getState) => {
    dispatch(creatingCatalog());

    const response = await axios({
      url: baseUrl,
      method: 'post',
      data: data,
    }).catch((error) => {
      dispatch(createCatalogFailure(error.message));
    });

    if (response) {
      dispatch(createCatalogSuccess(response.data));
    }
  };
};

export const updateCatalog = (id, data) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}`;

    dispatch(updatingCatalog());

    const response = await axios({
      url: url,
      method: 'put',
      data: data,
    }).catch((error) => {
      dispatch(updateCatalogFailure(error.message));
    });

    if (response) {
      dispatch(updateCatalogSuccess(response.data));
    }
  };
};

export const deleteCatalog = (id) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}`;

    dispatch(deletingCatalog());

    const response = await axios({
      url: url,
      method: 'delete',
    }).catch((error) => {
      dispatch(deleteCatalogFailure(error.message));
    });

    if (response) {
      dispatch(deleteCatalogSuccess(id));
    }
  };
};

export const getCatalog = (id) => {
  return async (dispatch, getState) => {
    const {
      catalogs: { items },
    } = getState();

    if (items[id]) {
      const catalog = { ...items[id] };
      dispatch(getCatalogSuccess(catalog));
      return;
    }

    dispatch(loadingCatalogs());

    const response = await axios({
      url: `${baseUrl}/${id}`,
      method: 'get',
    }).catch((error) => {
      dispatch(getCatalogFailure(error.message));
    });

    if (response) {
      const catalog = response.data;
      catalog.products = getIds(catalog.products || []);
      dispatch(getCatalogSuccess(catalog));
    }
  };
};

const loadingCatalogs = () => {
  return {
    type: LOADING_CATALOGS,
  };
};

const setCatalogsListTotal = (total) => {
  return {
    type: SET_CATALOGS_LIST_TOTAL,
    payload: total,
  };
};

const addListRequest = (req) => {
  return {
    type: ADD_CATALOGS_LIST_REQUEST,
    payload: req,
  };
};

const setListCurrentPage = (ids) => {
  return {
    type: SET_CATALOGS_LIST_CURRENT_PAGE,
    payload: ids,
  };
};

const getCatalogSuccess = (catalog) => {
  return {
    type: GET_CATALOG_SUCCESS,
    payload: catalog,
  };
};

const getCatalogFailure = (message) => {
  return {
    type: GET_CATALOG_FAILURE,
    payload: message,
  };
};

export const loadCatalogsSuccess = (catalogs) => {
  return {
    type: LOAD_CATALOGS_SUCCESS,
    payload: {
      items: buildObjectOfItems(catalogs),
    },
  };
};

const loadCatalogsFailure = (message) => {
  return {
    type: LOAD_CATALOGS_FAILURE,
    payload: message,
  };
};

const creatingCatalog = () => {
  return {
    type: CREATING_CATALOG,
  };
};

const createCatalogSuccess = (catalog) => {
  return {
    type: CREATE_CATALOG_SUCCESS,
    payload: catalog,
  };
};

const createCatalogFailure = (message) => {
  return {
    type: CREATE_CATALOG_FAILURE,
    payload: message,
  };
};

const updatingCatalog = () => {
  return {
    type: UPDATING_CATALOG,
  };
};

const updateCatalogSuccess = (catalog) => {
  return {
    type: UPDATE_CATALOG_SUCCESS,
    payload: catalog,
  };
};

const updateCatalogFailure = (message) => {
  return {
    type: UPDATE_CATALOG_FAILURE,
    payload: message,
  };
};

const deletingCatalog = () => {
  return {
    type: DELETING_CATALOG,
  };
};

const deleteCatalogSuccess = (id) => {
  return {
    type: DELETE_CATALOG_SUCCESS,
    payload: id,
  };
};

const deleteCatalogFailure = (message) => {
  return {
    type: DELETE_CATALOG_FAILURE,
    payload: message,
  };
};
