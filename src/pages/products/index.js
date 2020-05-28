import React, { useState } from 'react';
import { Table, Input, Button, Popconfirm, Form, notification } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

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
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [editingKey, setEditingKey] = useState('');

  React.useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/products')
      .then((data) => data.json())
      .then((data) => {
        setData(data.nodes);
        setTotal(data.total);
      });
  }, []);

  const get = (page, limit) => {
    cancel();
    fetch(process.env.REACT_APP_API_URL + '/products?page=' + page + '&limit=' + limit)
      .then((data) => data.json())
      .then((data) => {
        setData(data.nodes);
        setTotal(data.total);
      });
  };

  const isEditing = (record) => record.id === editingKey;

  const cancel = () => {
    setEditingKey('');
  };

  const deleteProduct = (key) => {
    const index = data.findIndex((item) => item.id === key);
    if (index > -1) {
      fetch(process.env.REACT_APP_API_URL + '/products/' + key, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.status === 200) {
            const newData = [...data];
            newData.splice(index, 1);
            setData(newData);
            notification.success({
              message: 'Success',
              description: 'Product succesfully deleted',
            });
          }
        })
        .catch((err) => {
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
      dataIndex: 'CreatedAt',
      width: '10%',
      render: (_, record) => {
        return <span title={record.CreatedAt}>{moment(record.CreatedAt).fromNow()}</span>;
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
                props.history.push(`/products/detail/${record.id}`);
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

export default Products;
