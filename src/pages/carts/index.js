import React, { useState } from 'react';
import { Table, Form, Button } from 'antd';
import moment from 'moment';

const Carts = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  React.useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/carts')
      .then((data) => data.json())
      .then((data) => {
        setData(data.nodes);
        setTotal(data.total);
      });
  }, []);

  const get = (page, limit) => {
    fetch(process.env.REACT_APP_API_URL + '/carts?page=' + page + '&limit=' + limit)
      .then((data) => data.json())
      .then((data) => {
        setData(data.nodes);
        setTotal(data.total);
      });
  };

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
              onClick={() => props.history.push(`/carts/${record.ID}`)}
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
          rowKey="ID"
          dataSource={data}
          columns={columns}
          pagination={{
            defaultPageSize: 5,
            onChange: get,
            total: total,
          }}
        />
      </Form>
    </div>
  );
};

export default Carts;
