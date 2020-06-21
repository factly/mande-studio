import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Form } from 'antd';
import moment from 'moment';

import { loadPayments } from '../../../actions/payments';

const PaymentsList = () => {
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });

  const dispatch = useDispatch();
  const { data, currencies, total } = useSelector(({ payments, currencies }) => {
    const { ids, items, total } = payments;

    return {
      data: ids.map((id) => items[id]),
      currencies: currencies.items,
      total,
    };
  });

  React.useEffect(() => {
    dispatch(loadPayments(pagination.page, pagination.limit));
  }, [pagination]);

  const columns = [
    {
      title: 'Amount',
      render: (record) => (
        <span>{`${record.amount} ${currencies[record.currency_id].iso_code}`}</span>
      ),
      width: '25%',
      editable: true,
    },
    {
      title: 'Gateway',
      dataIndex: 'gateway',
      width: '25%',
      editable: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '25%',
      editable: true,
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      width: '25%',
      render: (_, record) => {
        return <span title={record.created_at}>{moment(record.created_at).fromNow()}</span>;
      },
    },
  ];

  return (
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
  );
};

export default PaymentsList;
