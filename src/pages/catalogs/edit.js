import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'antd';

import CatalogCreate from './components/CatalogCreateForm';
import { getCatalog, updateCatalog } from '../../actions/catalogs';

const EditCatalog = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { catalog } = useSelector(({ catalogs }) => catalogs);

  React.useEffect(() => {
    dispatch(getCatalog(id));
  }, []);

  if (!catalog.id) return <Skeleton />;

  const onUpdate = async (values) => {
    await dispatch(updateCatalog(id, values));
    history.push('/catalogs');
  };

  return <CatalogCreate data={catalog} onSubmit={onUpdate} />;
};

export default EditCatalog;
