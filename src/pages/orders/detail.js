import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Descriptions, Card } from 'antd';

import { getOrder } from '../../actions/orders';
import OrderDetails from './components/OrderDetails';

const OrderDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { order, payments, currencies } = useSelector(({ orders, payments, currencies }) => ({
    order: orders.items[id],
    payments: payments.items,
    currencies: currencies.items,
  }));

  const payment = payments[order.payment_id];

  React.useEffect(() => {
    dispatch(getOrder(id));
  }, []);

  return (
    <div>
      {!order.id ? null : (
        <Card>
          <Descriptions title="Order details">
            <Descriptions.Item label="Order ID">{order.id}</Descriptions.Item>
            <Descriptions.Item label="Order Status">{order.status}</Descriptions.Item>
            <Descriptions.Item label="Payment">
              {payment.amount} {currencies[payment.currency_id].iso_code}
            </Descriptions.Item>
            <Descriptions.Item label="Payment Gateway">{payment.gateway}</Descriptions.Item>
            <Descriptions.Item label="Payment Status">{payment.status}</Descriptions.Item>
          </Descriptions>
        </Card>
      )}

      <OrderDetails />
    </div>
  );
};

export default OrderDetail;
