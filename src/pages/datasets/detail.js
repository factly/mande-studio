import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import DatasetDetails from './components/DatasetDetails';
import DatasetFormatsList from './components/DatasetFormatsList';

const DatasetDetail = () => {
  const { id } = useParams();
  const [datasetSampleId, setDatasetSampleId] = React.useState(null);
  const { dataset, datasetFormats } = useSelector(({ datasets }) => ({
    dataset: datasets.items[id],
    datasetFormats: datasets.items[id]?.formats,
  }));

  React.useEffect(() => {
    if (dataset?.sample_url) {
      const sample = datasetFormats.find((item) => item.url === dataset.sample_url);
      sample && setDatasetSampleId(sample.id);
    }
  }, [datasetFormats]);

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
