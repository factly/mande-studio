import axios from 'axios';
import {
  ADD_CATALOG,
  ADD_CATALOGS,
  SET_CATALOG_LOADING,
  SET_CATALOG_REQUEST,
  SET_CATALOG_IDS,
  RESET_CATALOG,
  CATALOG_API,
} from '../constants/catalogs';
import { addProducts } from './products';
import { addMedia } from './media';
import { getIds, getValues, buildObjectOfItems, deleteKeys } from '../utils/objects';

export const loadCatalogs = (query) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));

    const response = await axios({
      url: CATALOG_API,
      method: 'get',
      params: query,
    });

    const { nodes, total } = response.data;
    const currentPageIds = getIds(nodes);
    const currentReq = { ...query, ids: currentPageIds };
    dispatch(setCatalogRequest(currentReq, total));
    dispatch(addCatalogs(nodes));
    dispatch(setCatalogIds(currentPageIds));

    dispatch(setLoading(false));
  };
};

export const createCatalog = (data) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));

    await axios({
      url: CATALOG_API,
      method: 'post',
      data: data,
    });

    dispatch(resetCatalog());
    dispatch(setLoading(false));
  };
};

export const updateCatalog = (id, data) => {
  return async (dispatch, getState) => {
    let url = `${CATALOG_API}/${id}`;

    dispatch(setLoading(true));

    const response = await axios({
      url: url,
      method: 'put',
      data: data,
    });

    dispatch(addCatalog(response.data));
    dispatch(setLoading(false));
  };
};

export const deleteCatalog = (id) => {
  return async (dispatch, getState) => {
    let url = `${CATALOG_API}/${id}`;

    dispatch(setLoading(true));

    await axios({
      url: url,
      method: 'delete',
    });

    dispatch(resetCatalog());
    dispatch(setLoading(false));
  };
};

export const getCatalog = (id) => {
  return async (dispatch, getState) => {
    const {
      catalogs: { items },
    } = getState();

    if (items[id]) {
      return;
    }

    dispatch(setLoading(true));

    const response = await axios({
      url: `${CATALOG_API}/${id}`,
      method: 'get',
    });
    dispatch(addCatalog(response.data));

    dispatch(setLoading(false));
  };
};

export const setLoading = (loading) => {
  return {
    type: SET_CATALOG_LOADING,
    payload: { loading },
  };
};

export const addCatalog = (catalog) => (dispatch) => {
  const media = getValues([catalog], 'featured_medium');
  dispatch(addMedia(media));

  const products = getValues([catalog], 'products');
  dispatch(addProducts(products));

  catalog.products = getIds(catalog.products);

  dispatch({
    type: ADD_CATALOG,
    payload: { catalog: deleteKeys([catalog], ['featured_medium'])[0] },
  });
};

export const addCatalogs = (catalogs) => (dispatch) => {
  const media = getValues(catalogs, 'featured_medium');
  dispatch(addMedia(media));

  const products = getValues(catalogs, 'products');
  dispatch(addProducts(products));

  catalogs.forEach((catalog) => {
    catalog.products = getIds(catalog.products);
  });

  dispatch({
    type: ADD_CATALOGS,
    payload: {
      catalogs: buildObjectOfItems(deleteKeys(catalogs, ['featured_medium'])),
    },
  });
};

export const setCatalogRequest = (req, total) => {
  return {
    type: SET_CATALOG_REQUEST,
    payload: { req, total },
  };
};

export const setCatalogIds = (ids) => {
  return {
    type: SET_CATALOG_IDS,
    payload: { ids },
  };
};

export const resetCatalog = () => {
  return {
    type: RESET_CATALOG,
  };
};
