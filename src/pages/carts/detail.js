import React from 'react';
import { useParams } from 'react-router-dom';
import { Table, Form } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCartItems } from '../../actions/carts';

const CartDetail = (props) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { data, load, total } = props;

  React.useEffect(() => {
    load(id);
  }, [load, id]);

  const get = (page, limit) => load(id, page, limit);

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
            defaultPageSize: 5,
            onChange: get,
            total: total,
          }}
        />
      </Form>
    </div>
  );
};

CartDetail.propTypes = {
  data: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  load: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { details } = state.carts;
  return {
    data: details.items,
    total: details.total,
  };
};

const mapDispatchToProps = (dispatch) => ({
  load: (id, page, limit) => dispatch(getCartItems(id, page, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
