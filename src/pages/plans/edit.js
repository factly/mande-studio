import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'antd';

import PlanCreateForm from './components/PlanCreateForm';
import { getPlan, updatePlan } from '../../actions/plans';

const EditPlan = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, plan } = useSelector(({ plans }) => ({
    loading: plans.loading,
    plan: plans.items[id],
  }));

  React.useEffect(() => {
    dispatch(getPlan(id));
  }, []);

  if (loading) return <Skeleton />;

  const onUpdate = async (values) => {
    await dispatch(updatePlan(id, values));
    history.push('/plans');
  };

  return <PlanCreateForm data={plan} onSubmit={onUpdate} />;
};

export default EditPlan;
