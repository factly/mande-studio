import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CurrencyCreateForm from './components/CurrencyCreateForm';
import { createCurrency } from '../../actions/currencies';

const CurrencyCreate = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onCreate = (values) => {
    dispatch(createCurrency(values));
    history.push('/currencies');
  };

  return <CurrencyCreateForm onSubmit={onCreate} />;
};

export default CurrencyCreate;
