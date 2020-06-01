import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Form, Button } from 'antd';
import moment from 'moment';

import { loadOrders } from '../../actions/orders';

const Orders = (props) => {
  const [form] = Form.useForm();
  const { data, total, load } = props;

  React.useEffect(() => {
    load();
  }, [load]);

  const get = (page, limit) => load(page, limit);

  const columns = [
    {
      title: 'Cart',
      dataIndex: 'cart_id',
      width: '20%',
    },
    {
      title: 'Amount',
      render: (record) => (
        <span>{`${record.payment.amount} ${record.payment.currency.iso_code}`}</span>
      ),
      width: '20%',
    },
    {
      title: 'User',
      dataIndex: 'user_id',
      width: '20%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '20%',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      width: '20%',
      render: (_, record) => {
        return <span title={record.created_at}>{moment(record.created_at).fromNow()}</span>;
      },
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) => {
        return (
          <span>
            <Button
              type="primary"
              onClick={() => props.history.push(`/orders/${record.id}`)}
              style={{
                marginRight: 8,
              }}
            >
              Details
            </Button>
          </span>
        );
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

Orders.propTypes = {
  data: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  load: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { list } = state.orders;
  return {
    data: list.items,
    total: list.total,
  };
};

const mapDispatchToProps = (dispatch) => ({
  load: (page, limit) => dispatch(loadOrders(page, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
