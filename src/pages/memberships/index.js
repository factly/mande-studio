import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Form } from 'antd';
import moment from 'moment';

import { loadMemberships } from '../../actions/memberships';

const Memberships = (props) => {
  const [form] = Form.useForm();
  const { data, plans, users, total, load } = props;

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
      render: (record) => plans[record.plan_id].plan_name,
      width: '15%',
      editable: true,
    },
    {
      title: 'User',
      render: (record) => users[record.user_id].email,
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

Memberships.propTypes = {
  data: PropTypes.array.isRequired,
  plans: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
  load: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { list } = state.memberships;
  const { pagination } = list;
  const data = pagination.pages[pagination.currentPage];
  return {
    data: data ? data.map((id) => list.items[id]) : [],
    plans: state.plans.list.items,
    users: state.users.list.items,
    total: list.total,
  };
};

const mapDispatchToProps = (dispatch) => ({
  load: (page, limit) => dispatch(loadMemberships(page, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Memberships);
