import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import PlanCreateForm from './components/PlanCreateForm';
import { createPlan } from '../../actions/plans';

const PlanCreate = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onCreate = async (values) => {
    await dispatch(createPlan(values));
    history.push('/plans');
  };

  return <PlanCreateForm onSubmit={onCreate} />;
};

export default PlanCreate;
