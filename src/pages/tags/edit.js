import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'antd';

import TagCreateForm from './components/TagCreateForm';
import { getTag, updateTag } from '../../actions/tags';

const EditTag = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { tag } = useSelector(({ tags }) => tags);

  React.useEffect(() => {
    dispatch(getTag(id));
  }, []);

  if (!tag.id) return <Skeleton />;

  const onUpdate = async (values) => {
    await dispatch(updateTag(id, values));
    history.push('/tags');
  };

  return <TagCreateForm data={tag} onSubmit={onUpdate} />;
};

export default EditTag;
