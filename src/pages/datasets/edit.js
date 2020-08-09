import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'antd';

import DatasetCreateForm from './components/DatasetCreateForm';
import { getDataset, updateDataset, createDatasetFormat } from '../../actions/datasets';

const EditDataset = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, dataset } = useSelector(({ datasets }) => ({
    loading: datasets.loading,
    dataset: { ...datasets.items[id] },
  }));

  React.useEffect(() => {
    dispatch(getDataset(id));
  }, []);

  const onUpdateDataset = (values) => {
    return dispatch(updateDataset(id, values));
  };

  const onCreateDatasetFormat = (datasetId, data) => {
    return dispatch(createDatasetFormat(datasetId, data));
  };

  if (loading && !dataset.id) return <Skeleton />;

  dataset.frequency = {
    count: dataset.frequency?.split(' ')[0],
    units: dataset.frequency?.split(' ')[1],
  };

  return (
    <DatasetCreateForm
      dataset={dataset}
      datasetFormats={dataset.formats}
      onSubmitDataset={onUpdateDataset}
      onSubmitDatasetFormat={onCreateDatasetFormat}
    />
  );
};

export default EditDataset;
