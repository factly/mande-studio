import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Form } from 'antd';
import moment from 'moment';

import { loadMemberships } from '../../../actions/memberships';

const FormatsList = () => {
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });

  const dispatch = useDispatch();
  const { data, plans, users, total } = useSelector(({ memberships, plans, users }) => {
    const { ids, items, total } = memberships;

    return {
      data: ids.map((id) => items[id]),
      plans: plans.items,
      users: users.items,
      total,
    };
  });

  React.useEffect(() => {
    dispatch(loadMemberships(pagination.page, pagination.limit));
  }, [pagination]);

  const columns = [
    {
      title: 'Payment id',
      dataIndex: 'payment_id',
      width: '15%',
      editable: true,
    },
    {
      title: 'Plan',
      render: (record) => plans[record.plan_id].plan_name,
      width: '15%',
      editable: true,
    },
    {
      title: 'User',
      render: (record) => users[record.user_id].email,
      width: '15%',
      editable: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '15%',
      editable: true,
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      width: '15%',
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

export default FormatsList;
