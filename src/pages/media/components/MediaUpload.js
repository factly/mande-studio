import React from 'react';
import { useDispatch } from 'react-redux';
import { notification } from 'antd';

import { createMedium } from '../../../actions/media';
import Uploader from '../../../components/Uploader';

function MediaUploader() {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    try {
      Object.values(values).map((file) => {
        const data = {};
        data['alt_text'] = file.meta.caption;
        data['caption'] = file.meta.caption;
        data['description'] = file.meta.caption;
        data['dimensions'] = '100x100';
        data['file_size'] = file.size;
        data['name'] = file.meta.name;
        data['slug'] = file.meta.caption;
        data['title'] = file.meta.caption;
        data['type'] = file.meta.type;
        data['url'] = file.uploadURL;

        dispatch(createMedium(data))
          .then(() => {
            notification.success({
              message: 'Success',
              description: 'Media succesfully added',
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
    <div>
      <Uploader onUploadSuccess={onFinish} />
    </div>
  );
}

export default MediaUploader;
