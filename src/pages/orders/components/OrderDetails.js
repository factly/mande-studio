import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

const OrderDetails = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const { id } = useParams();
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });

  const { data, currencies, total } = useSelector(({ orders, products, currencies }) => {
    const { products: product_ids } = orders.items[id];

    return {
      data: product_ids.map((id) => products[id]),
      currencies: currencies.items,
      total: total,
    };
  });

  const columns = [
    {
      title: 'Product Item',
      dataIndex: 'title',
      width: '40%',
    },
    {
      title: 'Price',
      render: (record) => {
        const currency = currencies[record.currency_id];
        return (
          <span>
            {record.price} {currency.iso_code}
          </span>
        );
      },
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

export default OrderDetails;
