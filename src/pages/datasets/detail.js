import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import DatasetDetails from './components/DatasetDetails';
import DatasetFormatsList from './components/DatasetFormatsList';
import { getDataset } from '../../actions/datasets';
import { Skeleton } from 'antd';

const DatasetDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [datasetSampleId, setDatasetSampleId] = React.useState(null);
  const { dataset, datasetFormats } = useSelector(({ datasets }) => ({
    dataset: datasets.items[id],
    datasetFormats: datasets.items[id]?.formats,
  }));

  React.useEffect(() => {
    dispatch(getDataset(id));
  }, []);

  React.useEffect(() => {
    if (dataset?.sample_url) {
      const sample = datasetFormats.find((item) => item.url === dataset.sample_url);
      sample && setDatasetSampleId(sample.id);
    }
  }, [datasetFormats]);

  if (!dataset) return <Skeleton />;

  return (
    <>
      <DatasetDetails dataset={dataset} />
      <DatasetFormatsList
        datasetId={dataset.id}
        showOperations={false}
        datasetSampleId={datasetSampleId}
      />
    </>
  );
};

export default DatasetDetail;
