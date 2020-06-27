import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Popconfirm, Form, notification } from 'antd';
import moment from 'moment';
import { DeleteOutlined } from '@ant-design/icons';

import { deleteDatasetFormat } from '../../../actions/datasets';

const DatasetFormatsList = ({ datasetId, datasetFormatsL }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });
  const datasetFormats = useSelector(({ datasets }) => datasets.items[datasetId]?.formats);

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
    {
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
    },
  ];

  return (
    <Form form={form} component={false}>
      <Table
        bordered
        rowKey="id"
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
