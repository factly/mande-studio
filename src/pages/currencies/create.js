import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CurrencyCreateForm from './components/CurrencyCreateForm';
import { createCurrency } from '../../actions/currencies';

const CurrencyCreate = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onCreate = async (values) => {
    await dispatch(createCurrency(values));
    history.push('/categories');
  };

  return <CurrencyCreateForm onSubmit={onCreate} />;
};

export default CurrencyCreate;
