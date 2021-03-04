import React from 'react';
import { Button, Space, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loadFormats } from '../../../actions/formats';
import { updateDataset } from '../../../actions/datasets';
import Uploader from '../../../components/Uploader';
import DatasetFormatsList from './DatasetFormatsList';

const DatasetFormatForm = ({ datasetFormats, datasetId, onSubmit, prev }) => {
  const dispatch = useDispatch();
  const [datasetSampleId, setDatasetSampleId] = React.useState(null);
  const history = useHistory();
  const { formats, dataset } = useSelector(({ formats, datasets }) => ({
    dataset: datasets.items[datasetId],
    formats: Object.values(formats.items),
  }));

  React.useEffect(() => {
    dispatch(loadFormats());
  }, []);

  React.useEffect(() => {
    if (dataset?.sample_url) {
      const sample = datasetFormats.find((item) => item.url === dataset.sample_url);
      sample && setDatasetSampleId(sample.id);
    }
  }, [datasetFormats]);

  const onDone = () => {
    // if (!datasetSampleId) {
    //   alert('Please select a sample from uploaded datasets');
    //   return;
    // }
    // console.log({ datasetFormats });
    // console.log({ datasetSampleId });
    // const sampleUrl = datasetFormats.find((item) => item.id === datasetSampleId)?.url;
    // dispatch(updateDataset(datasetId, { sample_url: sampleUrl }));
    history.push('/datasets');
  };
  const onFinish = (values) => {
    try {
      Object.values(values).map((file) => {
        const data = { url: file.uploadURL };
        const index = formats
          .map((format) => format.name.toLowerCase())
          .indexOf(file.extension.toLowerCase());

        if (index !== -1) {
          data.format_id = formats[index].id;
        }

        onSubmit(data)
          .then(() => {
            notification.success({
              message: 'Success',
            });
          })
          .catch((error) => {
            console.log(error);

            notification.error({
              message: 'Error',
              description: 'Something went wrong',
            });
          });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Space>
        <Uploader onUploadSuccess={onFinish} />
        <Button onClick={onDone}>Done</Button>
      </Space>
      <DatasetFormatsList
        datasetId={datasetId}
        datasetFormats={datasetFormats}
        datasetSampleId={datasetSampleId}
        setDatasetSampleId={setDatasetSampleId}
      />
    </>
  );
};

export default DatasetFormatForm;
