import React from 'react';
import { Descriptions, Card, Tag } from 'antd';
import moment from 'moment';

const ProductDetails = ({ product, currencyCode, productTags }) => {
  return (
    <Card>
      <Descriptions title={product.title} column={1}>
        <Descriptions.Item label="Slug">{product.slug}</Descriptions.Item>
        <Descriptions.Item label="Price">
          {product.price} {currencyCode}
        </Descriptions.Item>
        <Descriptions.Item label="Status">{product.status}</Descriptions.Item>
        <Descriptions.Item label="Tags">
          {productTags.map((tag) => (
            <Tag key={tag.id}>{tag.title}</Tag>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          {moment(product.created_at).fromNow()}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ProductDetails;
