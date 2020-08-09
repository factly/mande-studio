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
  const { loading, format } = useSelector(({ formats }) => ({
    loading: formats.loading,
    format: formats.items[id],
  }));

  React.useEffect(() => {
    dispatch(getFormat(id));
  }, []);

  if (loading) return <Skeleton />;

  const onUpdate = (values) => {
    dispatch(updateFormat(id, values));
    history.push('/formats');
  };

  return <FormatCreateForm data={format} onSubmit={onUpdate} />;
};

export default EditFormat;
