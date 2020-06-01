import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Input, Button, Popconfirm, Form, notification } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { loadProducts, deleteProduct } from '../../actions/products';

const EditableCell = ({ editing, dataIndex, title, record, index, children, ...restProps }) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please enter ${title}!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Products = (props) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const { data, total, load, remove } = props;

  React.useEffect(() => {
    load();
  }, [load]);

  const get = (page, limit) => {
    cancel();
    load(page, limit);
  };

  const isEditing = (record) => record.id === editingKey;

  const cancel = () => {
    setEditingKey('');
  };

  const deleteProduct = (key) => {
    const index = data.findIndex((item) => item.id === key);
    if (index > -1) {
      remove(key, index)
        .then(() => {
          notification.success({
            message: 'Success',
            description: 'Product succesfully deleted',
          });
        })
        .catch(() => {
          notification.error({
            message: 'Error',
            description: 'Something went wrong',
          });
        });
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      width: '10%',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      width: '10%',
    },
    {
      title: 'Currency',
      render: (record) => record.currency.iso_code,
      width: '10%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '10%',
    },
    {
      title: 'Status',
      render: (record) => record.status,
      width: '10%',
    },
    {
      title: 'Categories',
      render: (record) => record.categories.map((c) => c.title).join(', '),
      width: '20%',
    },
    {
      title: 'Tags',
      render: (record) => record.tags.map((t) => t.title).join(', '),
      width: '20%',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      width: '10%',
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
              icon={<EditOutlined />}
              disabled={editingKey !== ''}
              onClick={() => {
                props.history.push(`/products/${record.id}`);
              }}
              style={{
                marginRight: 8,
              }}
            >
              Edit
            </Button>
            <Popconfirm
              disabled={editingKey !== ''}
              title="Sure to delete?"
              onConfirm={() => deleteProduct(record.id)}
            >
              <Button disabled={editingKey !== ''} icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <Link to={'/products/create'}>
        <Button type="primary" style={{ marginBottom: 16 }}>
          Add Product
        </Button>
      </Link>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          rowKey="id"
          dataSource={data}
          columns={mergedColumns}
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

Products.propTypes = {
  data: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  load: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { list } = state.products;
  return {
    data: list.items,
    total: list.total,
  };
};

const mapDispatchToProps = (dispatch) => ({
  load: (page, limit) => dispatch(loadProducts(page, limit)),
  remove: (id, index) => dispatch(deleteProduct(id, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
