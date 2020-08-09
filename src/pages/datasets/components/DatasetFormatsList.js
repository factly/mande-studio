import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Skeleton, Popconfirm, Form, notification } from 'antd';
import moment from 'moment';
import { DeleteOutlined } from '@ant-design/icons';

import { deleteDatasetFormat } from '../../../actions/datasets';

const DatasetFormatsList = ({ datasetId, showOperations = true }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });
  const { loading, datasetFormats } = useSelector(({ datasets }) => ({
    datasetFormats: datasets.items[datasetId]?.formats,
    loading: datasets.loading,
  }));

  const total = datasetFormats?.length;

  const remove = (id) => {
    dispatch(deleteDatasetFormat(datasetId, id))
      .then(() => {
        notification.success({
          message: 'Success',
        });
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: 'Error',
          description: 'Something went wrong',
        });
      });
  };

  const columns = [
    {
      title: 'URL',
      dataIndex: 'url',
      render: (_, record) => <Link>{record.url}</Link>,
      width: '30%',
      editable: true,
    },
    {
      title: 'Format',
      render: (_, record) => record.format.name,
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
  ];

  showOperations &&
    columns.push({
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) => {
        return (
          <span>
            <Popconfirm title="Sure to delete?" onConfirm={() => remove(record.id)}>
              <Button icon={<DeleteOutlined />}>Delete</Button>
            </Popconfirm>
          </span>
        );
      },
    });

  return loading ? (
    <Skeleton />
  ) : (
    <Form form={form} component={false}>
      <Table
        bordered
        rowKey="id"
        title={() => 'Dataset Formats'}
        dataSource={datasetFormats}
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

export default DatasetFormatsList;
