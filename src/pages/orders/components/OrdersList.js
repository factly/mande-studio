import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Form, Button } from 'antd';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import { loadOrders } from '../../../actions/orders';

const Orders = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });
  const dispatch = useDispatch();

  const { data, payments, currencies, total } = useSelector((state) => {
    const { list } = state.orders;
    const { ids } = list;

    return {
      data: ids.map((id) => list.items[id]),
      payments: state.payments.items,
      currencies: state.currencies.items,
      total: list.total,
    };
  });

  React.useEffect(() => {
    dispatch(loadOrders(pagination.page, pagination.limit));
  }, [pagination]);

  const columns = [
    {
      title: 'Cart',
      dataIndex: 'cart_id',
      width: '20%',
    },
    {
      title: 'Amount',
      render: (record) => {
        const payment = payments[record.payment_id];
        const currency = currencies[payment.currency_id];
        return <span>{`${payment.amount} ${currency.iso_code}`}</span>;
      },
      width: '20%',
    },
    {
      title: 'User',
      dataIndex: 'user_id',
      width: '20%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '20%',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      width: '20%',
      render: (_, record) => {
        return <span title={record.created_at}>{moment(record.created_at).fromNow()}</span>;
      },
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) => {
        return (
          <span>
            <Button
              type="primary"
              onClick={() => history.push(`/orders/${record.id}`)}
              style={{
                marginRight: 8,
              }}
            >
              Details
            </Button>
          </span>
        );
      },
    },
  ];

  return (
    <div>
      <Form form={form} component={false}>
        <Table
          bordered
          rowKey="id"
          dataSource={data}
          columns={columns}
          pagination={{
            current: pagination.page,
            defaultPageSize: 5,
            pageSize: pagination.limit,
            total,
            onChange: (page, limit) => setPagination({ page, limit }),
          }}
        />
      </Form>
    </div>
  );
};

export default Orders;
