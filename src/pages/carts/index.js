import React from 'react';
import { Table, Form, Button } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadCarts } from '../../actions/carts';

const Carts = (props) => {
  const [form] = Form.useForm();
  const { data, load, total } = props;

  React.useEffect(() => {
    load();
  }, [load]);

  const get = (page, limit) => load(page, limit);

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

Carts.propTypes = {
  data: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  load: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { list } = state.carts;
  return {
    data: Object.values(list.items),
    total: list.total,
  };
};

const mapDispatchToProps = (dispatch) => ({
  load: (page, limit) => dispatch(loadCarts(page, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Carts);
