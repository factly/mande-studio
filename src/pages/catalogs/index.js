import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Input, Button, Popconfirm, Form, notification } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';

import { loadCatalogs, updateCatalog, deleteCatalog } from '../../actions/catalogs';

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

const Catalogs = (props) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const { data, total, load, update, remove } = props;
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
    cancel();
    load(current, pageSize);
    setPagination({ ...pagination, current, pageSize, total });
  };

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue(record);
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const index = data.findIndex((item) => item.id === key);

      if (index > -1) {
        update(key, row)
          .then(() => {
            setEditingKey('');
            notification.success({
              message: 'Success',
              description: 'Catalog succesfully updated',
            });
          })
          .catch(() => {
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

  const deleteCatalog = (key) => {
    const index = data.findIndex((item) => item.id === key);
    if (index > -1) {
      remove(key)
        .then(() => {
          notification.success({
            message: 'Success',
            description: 'Catalog succesfully deleted',
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
      width: '20%',
      editable: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '20%',
      editable: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '20%',
      editable: true,
    },
    {
      title: 'Published At',
      dataIndex: 'published_date',
      width: '20%',
      render: (_, record) => {
        return <span title={record.created_at}>{moment(record.created_at).fromNow()}</span>;
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
              onClick={() => save(record.id)}
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
              onClick={() => edit(record)}
              style={{
                marginRight: 8,
              }}
            >
              Edit
            </Button>
            <Popconfirm
              disabled={editingKey !== ''}
              title="Sure to delete?"
              onConfirm={() => deleteCatalog(record.id)}
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
      <Link to={'/catalogs/create'}>
        <Button type="primary" style={{ marginBottom: 16 }}>
          Add Catalog
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
          onChange={handleTableChange}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={pagination}
        />
      </Form>
    </div>
  );
};

Catalogs.propTypes = {
  data: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  load: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

const mapStateToProps = ({ catalogs }) => {
  const { ids, items, total } = catalogs;
  return {
    data: ids.map((id) => items[id]),
    total,
  };
};

const mapDispatchToProps = (dispatch) => ({
  load: (page, limit) => dispatch(loadCatalogs(page, limit)),
  update: (id, data) => dispatch(updateCatalog(id, data)),
  remove: (id) => dispatch(deleteCatalog(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalogs);
