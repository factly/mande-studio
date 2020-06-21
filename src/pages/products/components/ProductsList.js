import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Popconfirm, Form, notification } from 'antd';
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { loadProducts, deleteProduct } from '../../../actions/products';

const ProductsList = () => {
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });

  const history = useHistory();
  const dispatch = useDispatch();
  const { data, currencies, tags, total } = useSelector(({ products, currencies, tags }) => {
    const { ids, items, total } = products;
    return {
      data: ids.map((id) => items[id]),
      currencies: currencies.items,
      tags: tags.items,
      total,
    };
  });

  React.useEffect(() => {
    dispatch(loadProducts(pagination.page, pagination.limit));
  }, [pagination]);

  const remove = (key) => {
    dispatch(deleteProduct(key))
      .then(() => {
        notification.success({
          message: 'Success',
          description: 'Product deleted',
        });
        dispatch(loadProducts(pagination.page, pagination.limit));
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
      width: '10%',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      width: '10%',
    },
    {
      title: 'Currency',
      render: (record) => currencies[record.currency_id].iso_code,
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
      title: 'Tags',
      render: (record) => record.tags.map((id) => tags[id].title).join(', '),
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
              onClick={() => history.push(`/products/${record.id}/edit`)}
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

export default ProductsList;
