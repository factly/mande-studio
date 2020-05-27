import React, { useState } from 'react';
import { Table, Form, Button } from 'antd';
import moment from 'moment';


const Orders = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  React.useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/orders')
      .then((data) => data.json())
      .then((data) => {
        setData(data.nodes);
        setTotal(data.total);
      });
  }, []);

  const get = (page, limit) => {
    fetch(process.env.REACT_APP_API_URL + '/orders?page=' + page + '&limit=' + limit)
      .then((data) => data.json())
      .then((data) => {
        setData(data.nodes);
        setTotal(data.total);
      });
  };

  const columns = [
    {
      title: 'Cart',
      dataIndex: 'cart_id',
      width: '20%',
    },
    {
      title: 'Amount',
      render: (record) => <span>{`${record.Payment.amount} ${record.Payment.Currency.iso_code}`}</span>,
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
      dataIndex: 'CreatedAt',
      width: '20%',
      render: (_, record) => {
        return <span title={record.CreatedAt}>{moment(record.CreatedAt).fromNow()}</span>;
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
              onClick={() => props.history.push(`${process.env.PUBLIC_URL}/orders/${record.ID}`)}
              style={{
                marginRight: 8,
              }}
              >
              Details
            </Button>
        </span>
        )
      }
    }
  ];

  return (
    <div>
      <Form form={form} component={false}>
        <Table
          bordered
          rowKey="ID"
          dataSource={data}
          columns={columns}
          pagination={{
            onChange: get,
            total: total,
          }}
        />
      </Form>
    </div>
  );
};

export default Orders;
