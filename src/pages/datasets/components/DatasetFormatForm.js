import React from 'react';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { loadFormats } from '../../../actions/formats';
import Uploader from '../../../components/Uploader';
import DatasetFormatsList from './DatasetFormatsList';

const DatasetFormatForm = ({ datasetFormats, datasetId, onSubmit, prev }) => {
  const dispatch = useDispatch();
  const formats = useSelector(({ formats }) => Object.values(formats.items));

  React.useEffect(() => {
    dispatch(loadFormats());
  }, []);

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
              description: 'Dataset Format succesfully added',
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
      <Uploader onUploadSuccess={onFinish} />
      <DatasetFormatsList datasetId={datasetId} datasetFormats={datasetFormats} />
    </>
  );
};

export default DatasetFormatForm;
