import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CatalogCreateForm from './components/CatalogCreateForm';
import { createCatalog } from '../../actions/catalogs';

const CatalogCreate = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onCreate = async (values) => {
    await dispatch(createCatalog(values));
    history.push('/categories');
  };

  return <CatalogCreateForm onSubmit={onCreate} />;
};

export default CatalogCreate;
