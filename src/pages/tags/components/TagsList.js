import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Popconfirm, Form, notification } from 'antd';
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { loadTags, deleteTag } from '../../../actions/tags';

const TagsList = () => {
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ page: 1, limit: 20 });

  const history = useHistory();
  const dispatch = useDispatch();
  const { data, total } = useSelector(({ tags }) => {
    const { ids, items, total } = tags;

    return {
      data: ids.map((id) => items[id]),
      total,
    };
  });

  React.useEffect(() => {
    dispatch(loadTags(pagination));
  }, [pagination]);

  const remove = (key) => {
    dispatch(deleteTag(key))
      .then(() => {
        notification.success({
          message: 'Success',
        });
        dispatch(loadTags(pagination));
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'Something went wrong',
        });
      });
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      width: '25%',
      editable: true,
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
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
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) => {
        return (
          <span>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => history.push(`/tags/${record.id}/edit`)}
              style={{
                marginRight: 8,
              }}
            >
              Edit
            </Button>
            <Popconfirm title="Sure to delete?" onConfirm={() => remove(record.id)}>
              <Button icon={<DeleteOutlined />}>Delete</Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  return (
    <Form form={form} component={false}>
      <Table
        bordered
        rowKey="id"
        dataSource={data}
        columns={columns}
        pagination={{
          current: pagination.page,
          defaultPageSize: 20,
          pageSize: pagination.limit,
          total,
          onChange: (page, limit) => setPagination({ page, limit }),
        }}
      />
    </Form>
  );
};

export default TagsList;
