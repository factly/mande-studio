import React from 'react';
import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import GoogleDrive from '@uppy/google-drive';
import Url from '@uppy/url';
import { DashboardModal } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/url/dist/style.css';

import { Button } from 'antd';

const uppy = Uppy({
  id: 'uppy-media',
  meta: { type: 'avatar' },
  allowedFileTypes: ['image/*'],
  autoProceed: false,
  onBeforeUpload: (files) => {
    const updatedFiles = files.filter((file) => file.extension);
    if (updatedFiles.length === 0) {
      return Promise.reject('File must have a valid file extension');
    }

    return updatedFiles;
  },
})
  .use(AwsS3, { companionUrl: 'http://localhost:3020' })
  .use(Url, { companionUrl: 'http://localhost:3020' })
  .use(GoogleDrive, { companionUrl: 'http://localhost:3020' });

const Uploader = ({ onUploadSuccess }) => {
  const [show, setShow] = React.useState(false);

  uppy.on('complete', (result) => {
    onUploadSuccess(result.successful[0]);
  });

  return (
    <div>
      <Button onClick={() => setShow(true)}>Upload</Button>
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
};

export default Uploader;
