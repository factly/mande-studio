import React, { useState } from 'react';
import { Table, Form } from 'antd';
import moment from 'moment';


const Payments = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  React.useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/payments')
      .then((data) => data.json())
      .then((data) => {
        setData(data.nodes);
        setTotal(data.total);
      });
  }, []);

  const get = (page, limit) => {
    fetch(process.env.REACT_APP_API_URL + '/payments?page=' + page + '&limit=' + limit)
      .then((data) => data.json())
      .then((data) => {
        setData(data.nodes);
        setTotal(data.total);
      });
  };

  const columns = [
    {
      title: 'Amount',
      render: (record) => <span>{`${record.amount} ${record.Currency.iso_code}`}</span>,
      width: '25%',
      editable: true,
    },
    {
      title: 'Gateway',
      dataIndex: "gateway",
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
      dataIndex: 'CreatedAt',
      width: '25%',
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
          rowKey="ID"
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

export default Payments;
