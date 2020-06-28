import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import DatasetDetails from './components/DatasetDetails';
import DatasetFormatsList from './components/DatasetFormatsList';

const DatasetDetail = () => {
  const { id } = useParams();
  const dataset = useSelector(({ datasets }) => datasets.items[id]);

  return (
    <>
      <DatasetDetails dataset={dataset} />
      <DatasetFormatsList datasetId={dataset.id} showOperations={false} />
    </>
  );
};

export default DatasetDetail;
