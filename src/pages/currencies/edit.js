import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'antd';

import CurrencyCreateForm from './components/CurrencyCreateForm';
import { getCurrency, updateCurrency } from '../../actions/currencies';

const EditCurrency = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, currency } = useSelector(({ currencies }) => ({
    loading: currencies.loading,
    currency: currencies.items[id],
  }));

  React.useEffect(() => {
    dispatch(getCurrency(id));
  }, []);

  if (loading) return <Skeleton />;

  const onUpdate = (values) => {
    dispatch(updateCurrency(id, values));
    history.push('/currencies');
  };

  return <CurrencyCreateForm data={currency} onSubmit={onUpdate} />;
};

export default EditCurrency;
