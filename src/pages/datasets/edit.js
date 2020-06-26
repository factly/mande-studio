import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'antd';

import DatasetCreateForm from './components/DatasetCreateForm';
import { getDataset, updateDataset, createDatasetFormat } from '../../actions/datasets';

const EditDataset = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { dataset } = useSelector(({ datasets }) => datasets);

  React.useEffect(() => {
    dispatch(getDataset(id));
  }, []);

  if (!dataset.id) return <Skeleton />;

  const onUpdateDataset = (values) => {
    return dispatch(updateDataset(id, values));
    // history.push('/datasets');
  };

  const onCreateDatasetFormat = (datasetId, data) => {
    return dispatch(createDatasetFormat(datasetId, data));
  };

  if (typeof dataset.frequency === 'string') {
    dataset.frequency = {
      count: dataset.frequency?.split(' ')[0],
      units: dataset.frequency?.split(' ')[1],
    };
  }

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
