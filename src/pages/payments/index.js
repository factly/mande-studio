import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Form } from 'antd';
import moment from 'moment';

import { loadPayments } from '../../actions/payments';

const Payments = (props) => {
  const [form] = Form.useForm();
  const { data, currencies, total, load } = props;

  React.useEffect(() => {
    load();
  }, [load]);

  const get = (page, limit) => load(page, limit);

  const columns = [
    {
      title: 'Amount',
      render: (record) => (
        <span>{`${record.amount} ${currencies[record.currency_id].iso_code}`}</span>
      ),
      width: '25%',
      editable: true,
    },
    {
      title: 'Gateway',
      dataIndex: 'gateway',
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
      dataIndex: 'created_at',
      width: '25%',
      render: (_, record) => {
        return <span title={record.created_at}>{moment(record.created_at).fromNow()}</span>;
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
          rowClassName="editable-row"
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

Payments.propTypes = {
  data: PropTypes.array.isRequired,
  currencies: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
  load: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { list } = state.payments;
  const { ids } = list;

  return {
    data: ids.map((id) => list.items[id]),
    currencies: state.currencies.list.items,
    total: list.total,
  };
};

const mapDispatchToProps = (dispatch) => ({
  load: (page, limit) => dispatch(loadPayments(page, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
