import React from 'react';
import { useDispatch } from 'react-redux';

import DatasetCreateForm from './components/DatasetCreateForm';
import { createDataset, createDatasetFormat } from '../../actions/datasets';

const DatasetCreate = () => {
  const dispatch = useDispatch();

  const onCreate = async (values) => {
    return dispatch(createDataset(values));
  };

  const onCreateDatasetFormat = (datasetId, data) => {
    return dispatch(createDatasetFormat(datasetId, data));
  };

  return (
    <DatasetCreateForm onSubmitDataset={onCreate} onSubmitDatasetFormat={onCreateDatasetFormat} />
  );
};

export default DatasetCreate;
