import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Descriptions, Card } from 'antd';

import { getOrderDetails } from '../../actions/orders';
import OrderDetails from './components/OrderDetails';

const OrderDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { order } = useSelector(({ orders }) => orders.details);

  React.useEffect(() => {
    dispatch(getOrderDetails(id));
  }, []);

  return (
    <div>
      {!order.id ? null : (
        <Card>
          <Descriptions title="Order details">
            <Descriptions.Item label="Order ID">{order.id}</Descriptions.Item>
            <Descriptions.Item label="Order Status">{order.status}</Descriptions.Item>
            <Descriptions.Item label="Payment">
              {order.payment.amount} {order.payment.currency.iso_code}
            </Descriptions.Item>
            <Descriptions.Item label="Payment Gateway">{order.payment.gateway}</Descriptions.Item>
            <Descriptions.Item label="Payment Status">{order.payment.status}</Descriptions.Item>
          </Descriptions>
        </Card>
      )}

      <OrderDetails />
    </div>
  );
};

export default OrderDetail;
