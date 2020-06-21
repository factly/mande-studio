import React from 'react';
import CurrenciesList from './components/CurrenciesList';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Currencies = () => {
  return (
    <>
      <Link to={'/currencies/create'}>
        <Button type="primary" style={{ marginBottom: 16 }}>
          Add Currency
        </Button>
      </Link>
      <CurrenciesList />
    </>
  );
};

export default Currencies;
