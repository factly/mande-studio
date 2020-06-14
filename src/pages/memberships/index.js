import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Form } from 'antd';
import moment from 'moment';

import { loadMemberships } from '../../actions/memberships';

const Memberships = (props) => {
  const [form] = Form.useForm();
  const { data, plans, users, total, load } = props;

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
    load(current, pageSize);
    setPagination({ ...pagination, current, pageSize, total });
  };

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
          onChange={handleTableChange}
          dataSource={data}
          columns={columns}
          rowClassName="editable-row"
          pagination={pagination}
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

const mapStateToProps = ({ plans, users, memberships }) => {
  const { ids, items, total } = memberships;

  return {
    data: ids.map((id) => items[id]),
    plans: plans.items,
    users: users.items,
    total,
  };
};

const mapDispatchToProps = (dispatch) => ({
  load: (page, limit) => dispatch(loadMemberships(page, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Memberships);
