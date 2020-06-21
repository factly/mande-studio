import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import TagCreateForm from './components/TagCreateForm';
import { createTag } from '../../actions/tags';

const TagCreate = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onCreate = async (values) => {
    await dispatch(createTag(values));
    history.push('/tags');
  };

  return <TagCreateForm onSubmit={onCreate} />;
};

export default TagCreate;
