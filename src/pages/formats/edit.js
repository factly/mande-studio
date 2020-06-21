import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'antd';

import FormatCreateForm from './components/FormatCreateForm';
import { getFormat, updateFormat } from '../../actions/formats';

const EditFormat = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { format } = useSelector(({ formats }) => formats);

  React.useEffect(() => {
    dispatch(getFormat(id));
  }, []);

  if (!format.id) return <Skeleton />;

  const onUpdate = async (values) => {
    await dispatch(updateFormat(id, values));
    history.push('/formats');
  };

  return <FormatCreateForm data={format} onSubmit={onUpdate} />;
};

export default EditFormat;
