import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import FormatCreateForm from './components/FormatCreateForm';
import { createFormat } from '../../actions/formats';

const FormatCreate = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onCreate = (values) => {
    dispatch(createFormat(values));
    history.push('/formats');
  };

  return <FormatCreateForm onSubmit={onCreate} />;
};

export default FormatCreate;
