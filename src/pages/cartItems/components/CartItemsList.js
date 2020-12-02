import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Form, Button } from 'antd';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import { loadCartItems } from '../../../actions/cartItems';

const CartItems = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });
  const dispatch = useDispatch();

  const { data, total } = useSelector(({ cartItems }) => {
    const { ids, items, total } = cartItems;

    return {
      data: ids.map((id) => items[id]),
      total,
    };
  });

  React.useEffect(() => {
    dispatch(loadCartItems(pagination.page, pagination.limit));
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
              onClick={() => history.push(`/cart-items/${record.id}`)}
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

export default CartItems;
