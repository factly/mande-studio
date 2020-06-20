import React, { useState } from 'react';
import { Table, Form, Button } from 'antd';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import { loadCarts } from '../../../actions/carts';

const Carts = () => {
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });
  const { dispatch } = useDispatch();

  const { data, total } = useSelector((state) => {
    const { list } = state.carts;
    const { ids } = list;

    return {
      data: ids.map((id) => list.items[id]),
      total: list.total,
    };
  });

  React.useEffect(() => {
    dispatch(loadCarts(...pagination));
  }, [pagination]);

  const columns = [
    {
      title: 'User',
      dataIndex: 'user_id',
      width: '40%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '30%',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      width: '30%',
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
              onClick={() => props.history.push(`/carts/${record.id}`)}
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
            current: 1,
            defaultPageSize: 5,
            pageSize: 5,
            total,
            onChange: (page, limit) => setPagination({ page, limit }),
          }}
        />
      </Form>
    </div>
  );
};

export default Carts;
