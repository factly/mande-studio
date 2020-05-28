import React, { useState } from 'react';
import { Table, Form } from 'antd';
import moment from 'moment';

const Memberships = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  React.useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/memberships')
      .then((data) => data.json())
      .then((data) => {
        setData(data.nodes);
        setTotal(data.total);
      });
  }, []);

  const get = (page, limit) => {
    fetch(process.env.REACT_APP_API_URL + '/memberships?page=' + page + '&limit=' + limit)
      .then((data) => data.json())
      .then((data) => {
        setData(data.nodes);
        setTotal(data.total);
      });
  };

  const columns = [
    {
      title: 'Payment id',
      dataIndex: 'payment_id',
      width: '15%',
      editable: true,
    },
    {
      title: 'Plan',
      render: (record) => record.Plan.plan_name,
      width: '15%',
      editable: true,
    },
    {
      title: 'User',
      render: (record) => record.User.email,
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
      dataIndex: 'CreatedAt',
      width: '15%',
      render: (_, record) => {
        return <span title={record.CreatedAt}>{moment(record.CreatedAt).fromNow()}</span>;
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
          rowClassName="editable-row"
          pagination={{
            onChange: get,
            total: total,
          }}
        />
      </Form>
    </div>
  );
};

export default Memberships;
