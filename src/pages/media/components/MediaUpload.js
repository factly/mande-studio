import React from 'react';
import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import GoogleDrive from '@uppy/google-drive';
import Url from '@uppy/url';
import { DashboardModal } from '@uppy/react';
import { useDispatch } from 'react-redux';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/url/dist/style.css';

import { createMedium } from '../../../actions/media';
import Uploader from '../../../components/Uploader';

function MediaUploader() {
  const dispatch = useDispatch();

  const [show, setShow] = React.useState(false);

  const uppy = Uppy({
    id: 'uppy-media',
    meta: { type: 'avatar' },
    allowedFileTypes: ['image/*'],
    autoProceed: false,
  })
    .use(AwsS3, { companionUrl: 'http://localhost:3020' })
    .use(Url, { companionUrl: 'http://localhost:3020' })
    .use(GoogleDrive, { companionUrl: 'http://localhost:3020' });
    .on('complete', (result) => {
    const successful = result.successful[0];
  });

  const onFinish = (values) => {
    try {
      Object.values(values).map((file) => {
        console.log(file)
        return;
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
        console.log(data);

        dispatch(createMedium(values))
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

      <DashboardModal
        uppy={uppy}
        closeModalOnClickOutside
        open={show}
        onRequestClose={() => setShow(false)}
        plugins={['GoogleDrive', 'Url']}
        metaFields={[
          { id: 'name', name: 'Name', placeholder: 'file name' },
          { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' },
        ]}
      />
    </div>
  );
}

export default MediaUploader;
