import React, { useState } from 'react';
import { Table, Form, Button } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadCarts } from '../../actions/carts';

const Carts = (props) => {
  const [form] = Form.useForm();
  const { data, load, total } = props;
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
      title: 'User',
      dataIndex: 'user_id',
      width: '40%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '30%',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      width: '30%',
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
              onClick={() => props.history.push(`/carts/${record.id}`)}
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
          onChange={handleTableChange}
          pagination={pagination}
        />
      </Form>
    </div>
  );
};

Carts.propTypes = {
  data: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  load: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { list } = state.carts;
  const { ids } = list;

  return {
    data: ids.map((id) => list.items[id]),
    total: list.total,
  };
};

const mapDispatchToProps = (dispatch) => ({
  load: (page, limit) => dispatch(loadCarts(page, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Carts);
