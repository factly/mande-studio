import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Popconfirm, Form, notification } from 'antd';
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { loadDatasets, deleteDataset } from '../../../actions/datasets';

const DatasetsList = () => {
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });

  const history = useHistory();
  const dispatch = useDispatch();
  const { data, total } = useSelector(({ datasets }) => {
    const { ids, items, total } = datasets;
    return {
      data: ids.map((id) => items[id]),
      total,
    };
  });

  React.useEffect(() => {
    dispatch(loadDatasets(pagination.page, pagination.limit));
  }, [pagination]);

  const remove = (key) => {
    dispatch(deleteDataset(key))
      .then(() => {
        notification.success({
          message: 'Success',
        });
        dispatch(loadDatasets(pagination.page, pagination.limit));
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
      width: '20%',
      editable: true,
      render: (_, record) => <Link to={`/datasets/${record.id}`}>{record.title}</Link>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '20%',
      editable: true,
    },
    {
      title: 'Source',
      dataIndex: 'source',
      width: '20%',
      editable: true,
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      width: '20%',
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
              onClick={() => history.push(`/datasets/${record.id}/edit`)}
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

export default DatasetsList;
