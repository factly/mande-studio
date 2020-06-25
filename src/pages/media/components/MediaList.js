import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Table, Button, Popconfirm, Form, notification } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { loadMedia, deleteMedium } from '../../../actions/media';

const MediaList = () => {
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });

  const history = useHistory();
  const dispatch = useDispatch();
  const { data, total } = useSelector(({ media }) => {
    const { ids, items, total } = media;
    return {
      data: ids.map((id) => items[id]),
      total,
    };
  });

  React.useEffect(() => {
    dispatch(loadMedia(pagination.page, pagination.limit));
  }, [pagination, total]);

  const remove = (key) => {
    dispatch(deleteMedium(key))
      .then(() => {
        notification.success({
          message: 'Success',
          description: 'Medium succesfully deleted',
        });
        dispatch(loadMedia(pagination.page, pagination.limit));
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
      title: 'Display',
      key: 'display',
      render: (_, record) => <Avatar shape="square" size={174} src={record.url} />,
      width: '15%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'File size',
      dataIndex: 'file_size',
      key: 'file_size',
      render: (_, record) => record.file_size + ' KB',
    },
    {
      title: 'Caption',
      dataIndex: 'caption',
      key: 'caption',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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
              onClick={() => history.push(`/media/${record.id}/edit`)}
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
          defaultPageSize: 5,
          pageSize: pagination.limit,
          total,
          onChange: (page, limit) => setPagination({ page, limit }),
        }}
      />
    </Form>
  );
};

export default MediaList;
