import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Form } from 'antd';

const CartDetail = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const { id } = useParams();

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/carts/${id}/items`)
      .then((data) => data.json())
      .then((data) => {
        setData(data.nodes);
        setTotal(data.total);
      });
  }, [id]);

  const get = (page, limit) => {
    fetch(`${process.env.REACT_APP_API_URL}/carts/${id}/items?page=${page}&limit=${limit}`)
      .then((data) => data.json())
      .then((data) => {
        setData(data.nodes);
        setTotal(data.total);
      });
  };

  const columns = [
    {
      title: 'Product Item',
      render: (record) => record.Product.title,
      width: '40%',
    },
    {
      title: 'Price',
      render: (record) => (
        <span>
          {record.Product.price} {record.Product.currency.iso_code}
        </span>
      ),
      width: '20%',
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
            onChange: get,
            total: total,
          }}
        />
      </Form>
    </div>
  );
};

export default CartDetail;
