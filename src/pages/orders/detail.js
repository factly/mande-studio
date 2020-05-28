import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Form, Descriptions, Card, notification } from 'antd';

const OrderDetail = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [order, setOrder] = useState();
  const [total, setTotal] = useState(0);
  const { id } = useParams();

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/${id}`)
      .then((data) => data.json())
      .then((data) => {
        setOrder(data);
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'Something went wrong',
        });
      });

    fetch(`${process.env.REACT_APP_API_URL}/orders/${id}/items`)
      .then((data) => data.json())
      .then((data) => {
        setData(data.nodes);
        setTotal(data.total);
      });
  }, [id]);

  const get = (page, limit) => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/${id}/items?page=${page}&limit=${limit}`)
      .then((data) => data.json())
      .then((data) => {
        setData(data.nodes);
        setTotal(data.total);
      });
  };

  const columns = [
    {
      title: 'Product Item',
      render: (record) => record.product.title,
      width: '40%',
    },
    {
      title: 'Price',
      render: (record) => (
        <span>
          {record.product.price} {record.product.currency.iso_code}
        </span>
      ),
      width: '20%',
    },
    {
      title: 'Extra Info',
      dataIndex: 'extra_info',
      width: '30%',
    },
  ];

  return (
    <div>
      {!order ? null : (
        <Card>
          <Descriptions title="Order details">
            <Descriptions.Item label="Order ID">{order.id}</Descriptions.Item>
            <Descriptions.Item label="Order Status">{order.status}</Descriptions.Item>
            <Descriptions.Item label="Payment">
              {order.payment.amount} {order.payment.currency.iso_code}
            </Descriptions.Item>
            <Descriptions.Item label="Payment Gateway">{order.payment.gateway}</Descriptions.Item>
            <Descriptions.Item label="Payment Status">{order.payment.status}</Descriptions.Item>
          </Descriptions>
        </Card>
      )}

      <Form form={form} component={false}>
        <Table
          bordered
          rowKey="id"
          dataSource={data}
          columns={columns}
          pagination={{
            defaultPageSize: 5,
            total: total,
            onChange: get,
          }}
        />
      </Form>
    </div>
  );
};

export default OrderDetail;
