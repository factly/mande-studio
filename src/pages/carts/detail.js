import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Form } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCartItems } from '../../actions/carts';

const CartDetail = (props) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { data, products, currencies, load, total } = props;
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 5,
    pageSize: 5,
    total,
  });

  React.useEffect(() => {
    handleTableChange(pagination);
  }, [total]);

  const handleTableChange = ({ current, pageSize }) => {
    load(id, current, pageSize);
    setPagination({ ...pagination, current, pageSize, total });
  };

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
          onChange={handleTableChange}
          pagination={pagination}
        />
      </Form>
    </div>
  );
};

CartDetail.propTypes = {
  data: PropTypes.array.isRequired,
  products: PropTypes.object.isRequired,
  currencies: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
  load: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { details } = state.carts;
  const { ids } = details;

  return {
    data: ids.map((id) => details.items[id]),
    products: state.products.items,
    currencies: state.currencies.items,
    total: details.total,
  };
};

const mapDispatchToProps = (dispatch) => ({
  load: (id, page, limit) => dispatch(getCartItems(id, page, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
