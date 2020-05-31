import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Form } from 'antd';
import moment from 'moment';

import Loading from '../../components/loading';
import { loadMemberships } from '../../actions/memberships';

const Memberships = (props) => {
  const [form] = Form.useForm();
  const { loading, data, total, load } = props;

  React.useEffect(() => {
    load();
  }, [load]);

  const get = (page, limit) => load(page, limit);

  const columns = [
    {
      title: 'Payment id',
      dataIndex: 'payment_id',
      width: '15%',
      editable: true,
    },
    {
      title: 'Plan',
      render: (record) => record.plan.plan_name,
      width: '15%',
      editable: true,
    },
    {
      title: 'User',
      render: (record) => record.user.email,
      width: '15%',
      editable: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '15%',
      editable: true,
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      width: '15%',
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

Memberships.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  load: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { list } = state.memberships;
  return {
    loading: list.loading,
    data: list.items,
    total: list.total,
  };
};

const mapDispatchToProps = (dispatch) => ({
  load: (page, limit) => dispatch(loadMemberships(page, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Memberships);
