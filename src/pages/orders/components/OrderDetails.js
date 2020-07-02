import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { loadOrderItems } from '../../../actions/orderItems';

const OrderDetails = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const { id } = useParams();
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });

  const { data, products, currencies, total } = useSelector(
    ({ orderItems, products, currencies }) => {
      const { ids, items, total } = orderItems;

      return {
        data: ids.map((id) => items[id]),
        products: products.items,
        currencies: currencies.items,
        total: total,
      };
    },
  );

  React.useEffect(() => {
    dispatch(loadOrderItems(id, pagination.page, pagination.limit));
  }, [pagination]);

  const columns = [
    {
      title: 'Product Item',
      render: (record) => products[record.product_id].title || '',
      width: '40%',
    },
    {
      title: 'Price',
      render: (record) => {
        const product = products[record.product_id];
        const currency = currencies[product.currency_id];
        return (
          <span>
            {product.price} {currency.iso_code}
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
