import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Table, Form, Descriptions, Card } from 'antd';

import Loading from '../../components/loading';
import { getOrderDetails, getOrderItems } from '../../actions/orders';

const OrderDetail = (props) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { loading, data, order, getOrder, loadItems } = props;
  const total = data.length;

  React.useEffect(() => {
    getOrder(id);
    loadItems(id);
  }, [getOrder, loadItems, id]);

  const get = (page, limit) => loadItems(id, page, limit);

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

  return loading ? (
    <Loading />
  ) : (
    <div>
      {!order.id ? null : (
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

OrderDetail.propTypes = {
  loading: PropTypes.bool.isRequired,
  order: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  getOrder: PropTypes.func.isRequired,
  loadItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { details } = state.orders;
  return {
    loading: details.loading,
    order: details.order,
    data: details.items,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getOrder: (id) => dispatch(getOrderDetails(id)),
  loadItems: (id, page, limit) => dispatch(getOrderItems(id, page, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
