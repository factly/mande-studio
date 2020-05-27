import React, { useState } from 'react';
import { Table, Input, Button, Popconfirm, Form, notification } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';

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

  const isEditing = (record) => record.ID === editingKey;

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const index = data.findIndex((item) => item.ID === key);

      if (index > -1) {
        const item = data[index];
        fetch(process.env.REACT_APP_API_URL + '/products/' + item.ID, {
          method: 'PUT',
          body: JSON.stringify(row),
        })
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            } else {
              throw new Error(res.status);
            }
          })
          .then((res) => {
            const newData = [...data];
            newData.splice(index, 1, res);
            setData(newData);
            setEditingKey('');
            notification.success({
              message: 'Success',
              description: 'Product succesfully updated',
            });
          })
          .catch((err) => {
            notification.error({
              message: 'Error',
              description: 'Something went wrong',
            });
          });
      }
    } catch (err) {
      notification.warning({
        message: 'Warning',
        description: 'Validation failed',
      });
    }
  };

  const deleteProduct = (key) => {
    const index = data.findIndex((item) => item.ID === key);
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
      render: (record) => record.Currency.iso_code,
      width: '10%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '10%',
    },
    {
      title: 'Status',
      render: (record) => record.Status.name,
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
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={() => save(record.ID)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Button>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button icon={<CloseOutlined />}>Cancel</Button>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Button
              type="primary"
              icon={<EditOutlined />}
              disabled={editingKey !== ''}
              onClick={() => props.history.push(`${process.env.PUBLIC_URL}/products/{record.id}`)}
              style={{
                marginRight: 8,
              }}
            >
              Edit
            </Button>
            <Popconfirm
              disabled={editingKey !== ''}
              title="Sure to delete?"
              onConfirm={() => deleteProduct(record.ID)}
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
      <Link to={process.env.PUBLIC_URL + '/products/create'}>
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
            onChange: get,
            total: total,
          }}
        />
      </Form>
    </div>
  );
};

export default Products;
