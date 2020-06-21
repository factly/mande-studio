import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { getCartItems } from '../../../actions/carts';

const CartDetail = () => {
  const dispatch = useDispatch;
  const { data, products, currencies, total } = useSelector((state) => {
    const { details } = state.carts;
    const { ids } = details;

    return {
      data: ids.map((id) => details.items[id]),
      products: state.products.items,
      currencies: state.currencies.items,
      total: details.total,
    };
  });

  const [form] = Form.useForm();
  const { id } = useParams();
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });

  React.useEffect(() => {
    dispatch(getCartItems(id, ...pagination));
  }, [pagination]);

  const columns = [
    {
      title: 'Product Item',
      render: (record) => products[record.product_id].title,
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

export default CartDetail;
