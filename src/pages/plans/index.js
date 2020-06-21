import React from 'react';
import PlansList from './components/PlansList';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Plans = () => {
  return (
    <>
      <Link to={'/plans/create'}>
        <Button type="primary" style={{ marginBottom: 16 }}>
          Add Plan
        </Button>
      </Link>
      <PlansList />
    </>
  );
};

export default Plans;
