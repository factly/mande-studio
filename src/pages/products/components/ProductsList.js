import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Descriptions, List, Card, Tag, Popconfirm, notification } from 'antd';
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { loadProducts, deleteProduct } from '../../../actions/products';

const ProductItem = ({ product, currencies, tags, actions }) => {
  return (
    <Card actions={actions}>
      <Descriptions title={<Link to={`/products/${product.id}`}>{product.title}</Link>}>
        <Descriptions.Item label="Slug">{product.slug}</Descriptions.Item>
        <Descriptions.Item label="Price">
          {product.price} {currencies[product.currency_id].iso_code}
        </Descriptions.Item>
        <Descriptions.Item label="Status">{product.status}</Descriptions.Item>
        <Descriptions.Item label="Tags">
          {product.tags.map((id) => (
            <Tag key={id}>{tags[id].title}</Tag>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          {moment(product.created_at).fromNow()}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

const ProductsList = () => {
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
    dispatch(loadProducts(pagination));
  }, [pagination]);

  const remove = (key) => {
    dispatch(deleteProduct(key))
      .then(() => {
        notification.success({
          message: 'Success',
        });
        dispatch(loadProducts(pagination));
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'Something went wrong',
        });
      });
  };

  const actions = (id) => [
    <EditOutlined
      key="edit"
      onClick={() => {
        history.push(`/products/${id}/edit`);
      }}
    />,
    <Popconfirm title="Sure to delete?" onConfirm={() => remove(id)}>
      <DeleteOutlined key="delete" />
    </Popconfirm>,
  ];

  return (
    <List
      dataSource={data}
      pagination={{
        current: pagination.page,
        defaultPageSize: 5,
        pageSize: pagination.limit,
        total,
        onChange: (page, limit) => setPagination({ page, limit }),
      }}
      renderItem={(product) => {
        return (
          <List.Item>
            <ProductItem
              product={product}
              tags={tags}
              currencies={currencies}
              actions={actions(product.id)}
            />
          </List.Item>
        );
      }}
    />
  );
};

export default ProductsList;
