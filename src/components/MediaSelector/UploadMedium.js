import React from 'react';
import UppyUploader from '../Uppy';
import { useDispatch } from 'react-redux';
import { createMedium } from '../../actions/media';

function UploadMedium({ onMediaUpload }) {
  const dispatch = useDispatch();
  const onUpload = (values) => {
    dispatch(createMedium(values)).then(() => {
      if (values.length === 1) {
        onMediaUpload(values);
      }
    });
  };
  return <UppyUploader onUpload={onUpload} />;
}

export default UploadMedium;
