import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Popconfirm, Form, notification } from 'antd';
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { loadCatalogs, deleteCatalog } from '../../../actions/catalogs';

const CatalogsList = () => {
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });

  const history = useHistory();
  const dispatch = useDispatch();
  const { data, total } = useSelector(({ catalogs }) => {
    const { ids, items, total } = catalogs;
    return {
      data: ids.map((id) => items[id]),
      total,
    };
  });

  React.useEffect(() => {
    dispatch(loadCatalogs(pagination.page, pagination.limit));
  }, [pagination]);

  const remove = (key) => {
    dispatch(deleteCatalog(key))
      .then(() => {
        notification.success({
          message: 'Success',
          description: 'Catalog succesfully deleted',
        });
      })
      .then(() => loadCatalogs(...pagination))
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
      width: '20%',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '20%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '20%',
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
        return (
          <span>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => history.push(`/catalogs/${record.id}/edit`)}
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
          current: 1,
          defaultPageSize: 5,
          pageSize: 5,
          total,
          onChange: (page, limit) => setPagination(page, limit),
        }}
      />
    </Form>
  );
};

export default CatalogsList;
