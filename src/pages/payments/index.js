import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Form } from 'antd';
import moment from 'moment';

import Loading from '../../components/loading';
import { loadPayments } from '../../actions/payments';

const Payments = (props) => {
  const [form] = Form.useForm();
  const { loading, data, load } = props;
  const total = data.length;

  React.useEffect(() => {
    load();
  }, [load]);

  const get = (page, limit) => load(page, limit);

  const columns = [
    {
      title: 'Amount',
      render: (record) => <span>{`${record.amount} ${record.currency.iso_code}`}</span>,
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

  return loading ? (
    <Loading />
  ) : (
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
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  load: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { list } = state.payments;
  return {
    loading: list.loading,
    data: list.items,
  };
};

const mapDispatchToProps = (dispatch) => ({
  load: (page, limit) => dispatch(loadPayments(page, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
