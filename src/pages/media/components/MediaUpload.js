import React from 'react';
import { useDispatch } from 'react-redux';
import { notification } from 'antd';

import { createMedium } from '../../../actions/media';
import Uploader from '../../../components/Uploader';

function MediaUploader({ onUploadSuccess = () => {} }) {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    try {
      Object.values(values).map((file) => {
        const data = {};
        data['alt_text'] = file.meta.caption;
        data['caption'] = file.meta.caption;
        data['description'] = file.meta.description;
        data['dimensions'] = '100x100';
        data['file_size'] = file.size;
        data['name'] = file.meta.name;
        data['slug'] = file.meta.caption;
        data['title'] = file.meta.caption;
        data['type'] = file.meta.type;
        data['url'] = file.uploadURL;

        dispatch(createMedium(data))
          .then((data) => {
            notification.success({
              message: 'Success',
            });
            onUploadSuccess(data);
          })
          .catch((error) => {
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

  const metaFields = [
    { id: 'name', name: 'Name', placeholder: 'file name' },
    { id: 'caption', name: 'Caption', placeholder: 'add a caption' },
    {
      id: 'description',
      name: 'Description',
      placeholder: 'describe what the image is about',
    },
  ];
  return (
    <div>
      <Uploader onUploadSuccess={onFinish} metaFields={metaFields} />
    </div>
  );
}

export default MediaUploader;
