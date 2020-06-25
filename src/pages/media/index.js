import React from 'react';

import MediaList from './components/MediaList';
import MediaUploader from './components/MediaUpload';

function Media() {
  return (
    <>
      <MediaUploader />
      <MediaList />
    </>
  );
}

export default Media;
