import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, DatePicker, Select, Button, notification } from 'antd';

import { createCatalog } from '../../actions/catalogs';
import { loadProducts } from '../../actions/products';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const CatalogCreate = (props) => {
  const { create, products, loadProducts } = props;

  React.useEffect(() => {
    loadProducts();
  }, []);

  const onFinish = (values) => {
    create(values)
      .then(() => {
        notification.success({
          message: 'Success',
          description: 'Catalog added succesfully',
        });
        props.history.push('/catalogs');
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'Something went wrong',
        });
      });
  };

  return (
    <Form name="catalogs_create" {...formItemLayout} onFinish={onFinish}>
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please enter catalog name!',
          },
        ]}
      >
        <Input placeholder="Ex. Cricket" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please enter catalog description!',
          },
        ]}
      >
        <Input placeholder="Ex. Package of datasets of Indian cricket" />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[
          {
            required: true,
            message: 'Please enter price!',
          },
        ]}
      >
        <InputNumber min={0} placeholder="Ex. 1999" />
      </Form.Item>

      <Form.Item
        label="Products"
        name="product_ids"
        rules={[
          {
            required: true,
            message: 'Please select atleast one tag!',
          },
        ]}
      >
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Select products"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {products.length > 0
            ? products.map((product) => (
                <Option key={product.id} value={parseInt(product.id)}>
                  {product.title}
                </Option>
              ))
            : []}
        </Select>
      </Form.Item>

      <Form.Item
        label="Published date"
        name="published_date"
        rules={[
          {
            required: true,
            message: 'Please select date of publishing!',
          },
        ]}
      >
        <DatePicker format="YYYY-MM-DDTHH:mm:ssZ" />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

CatalogCreate.propTypes = {
  create: PropTypes.func.isRequired,
};

const mapStateToProps = ({ products }) => ({
  products: Object.values(products.items),
});

const mapDispatchToProps = (dispatch) => ({
  create: (values) => dispatch(createCatalog(values)),
  loadProducts: () => dispatch(loadProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogCreate);
