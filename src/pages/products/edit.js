import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Button, notification, Select } from 'antd';
import { useParams } from 'react-router-dom';

import { updateProduct, getProductDetails } from '../../actions/products';
import { loadTags } from '../../actions/tags';
import { loadProductTypes } from '../../actions/product_types';
import { loadCategories } from '../../actions/categories';
import { loadCurrencies } from '../../actions/currencies';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const ProductEdit = (props) => {
  const { id } = useParams();
  const {
    product,
    tags,
    categories,
    currencies,
    productTypes,
    getDetails,
    update,
    loadTags,
    loadCategories,
    loadCurrencies,
    loadProductTypes,
  } = props;

  React.useEffect(() => {
    getDetails(id);
    loadTags();
    loadCategories();
    loadCurrencies();
    loadProductTypes();
  }, [id]);

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const onFinish = (values) => {
    values.currency_id = parseInt(values.currency_id);
    values.product_type_id = parseInt(values.product_type_id);
    values.price = parseInt(values.price);
    values.category_ids = values.category_ids.map((id) => parseInt(id));
    values.tag_ids = values.tag_ids.map((id) => parseInt(id));

    update(id, values)
      .then(() => {
        notification.success({
          message: 'Success',
          description: 'Product succesfully updated',
        });
        props.history.push('/products');
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'Something went wrong',
        });
      });
  };

  const initialValues = {
    slug: product.id ? product.slug : '',
    title: product.id ? product.title : '',
    price: product.id ? product.price : null,
    currency_id: product.id ? product.currency.id : '',
    category_ids: product.id ? product.categories.map((category) => category.id) : [],
    tag_ids: product.id ? product.tags.map((tag) => tag.id) : [],
    status: product.id ? product.status : '',
    product_type_id: product.id ? product.product_type.id : '',
  };

  return !product.id ? null : (
    <Form
      name="products_update"
      {...formItemLayout}
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please enter title!',
          },
        ]}
      >
        <Input placeholder="Ex. Crime In India" />
      </Form.Item>

      <Form.Item
        label="Slug"
        name="slug"
        rules={[
          {
            required: true,
            message: 'Please enter slug!',
          },
        ]}
      >
        <Input placeholder="Ex. crime-in-india" />
      </Form.Item>

      <Form.Item
        label="Currency"
        name="currency_id"
        rules={[
          {
            required: true,
            message: 'Please enter currency!',
          },
        ]}
      >
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="Select currency"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {currencies.length > 0
            ? currencies.map((currency) => (
                <Select.Option key={currency.id} value={currency.id}>
                  {currency.name}
                </Select.Option>
              ))
            : []}
        </Select>
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
        <Input type="number" placeholder="Ex. 1999" />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category_ids"
        rules={[
          {
            required: true,
            message: 'Please select atleast one category!',
          },
        ]}
      >
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Select categories"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {categories.length > 0
            ? categories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.title}
                </Select.Option>
              ))
            : []}
        </Select>
      </Form.Item>

      <Form.Item
        label="Tag"
        name="tag_ids"
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
          placeholder="Select tags"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {tags.length > 0
            ? tags.map((tag) => (
                <Select.Option key={tag.id} value={tag.id}>
                  {tag.title}
                </Select.Option>
              ))
            : []}
        </Select>
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        rules={[
          {
            required: true,
            message: 'Please enter status!',
          },
        ]}
      >
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="Select status"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option key={1} value={'Show'}>
            Show
          </Option>
          <Option key={2} value={'Hide'}>
            Hide
          </Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Type"
        name="product_type_id"
        rules={[
          {
            required: true,
            message: 'Please enter type!',
          },
        ]}
      >
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="Select type"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {productTypes.length > 0
            ? productTypes.map((product) => (
                <Select.Option key={product.id} value={product.id}>
                  {product.name}
                </Select.Option>
              ))
            : []}
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

ProductEdit.propTypes = {
  update: PropTypes.func.isRequired,
  getDetails: PropTypes.func.isRequired,
  loadTags: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired,
  loadCurrencies: PropTypes.func.isRequired,
  loadProductTypes: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  currencies: PropTypes.array.isRequired,
  productTypes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.products.product,
  tags: Object.values(state.tags.items),
  categories: Object.values(state.categories.items),
  currencies: Object.values(state.currencies.items),
  productTypes: Object.values(state.productTypes.items),
});

const mapDispatchToProps = (dispatch) => ({
  update: (id, values) => dispatch(updateProduct(id, values)),
  getDetails: (id) => dispatch(getProductDetails(id)),
  loadTags: () => dispatch(loadTags()),
  loadCategories: () => dispatch(loadCategories()),
  loadCurrencies: () => dispatch(loadCurrencies()),
  loadProductTypes: () => dispatch(loadProductTypes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);
