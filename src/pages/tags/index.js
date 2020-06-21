import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import TagsList from './components/TagsList';

const Tags = () => {
  return (
    <>
      <Link to={'/tags/create'}>
        <Button type="primary" style={{ marginBottom: 16 }}>
          Add Tag
        </Button>
      </Link>
      <TagsList />
    </>
  );
};

export default Tags;
