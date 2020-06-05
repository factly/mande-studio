import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Button, notification, Select } from 'antd';

import { createProduct } from '../../actions/products';
import { loadTags } from '../../actions/tags';
import { loadProductTypes } from '../../actions/product_types';
import { loadCategories } from '../../actions/categories';
import { loadCurrencies } from '../../actions/currencies';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const ProductCreate = (props) => {
  const {
    tags,
    categories,
    currencies,
    productTypes,
    create,
    loadTags,
    loadCategories,
    loadCurrencies,
    loadProductTypes,
  } = props;

  React.useEffect(() => {
    loadTags();
    loadCategories();
    loadCurrencies();
    loadProductTypes();
  }, []);

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const onFinish = (values) => {
    values.currency_id = parseInt(values.currency_id);
    values.product_type_id = parseInt(values.product_type_id);
    values.price = parseInt(values.price);
    values.category_ids = values.category_ids.map((c) => parseInt(c));
    values.tag_ids = values.tag_ids.map((t) => parseInt(t));
    create(values)
      .then(() => {
        notification.success({
          message: 'Success',
          description: 'Product succesfully added',
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

  return (
    <Form name="products_create" {...formItemLayout} onFinish={onFinish}>
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
            ? currencies.map((currency) => <Option key={currency.id}>{currency.iso_code}</Option>)
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
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Select categories"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {categories.length > 0
            ? categories.map((category) => <Option key={category.id}>{category.slug}</Option>)
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
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Select tags"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {tags.length > 0 ? tags.map((tag) => <Option key={tag.id}>{tag.slug}</Option>) : []}
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
            ? productTypes.map((p) => <Option key={p.id}>{p.name}</Option>)
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

ProductCreate.propTypes = {
  create: PropTypes.func.isRequired,
  loadTags: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired,
  loadCurrencies: PropTypes.func.isRequired,
  loadProductTypes: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  currencies: PropTypes.array.isRequired,
  productTypes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  tags: Object.values(state.tags.list.items),
  categories: Object.values(state.categories.list.items),
  currencies: Object.values(state.currencies.list.items),
  productTypes: Object.values(state.productTypes.list.items),
});

const mapDispatchToProps = (dispatch) => ({
  create: (values) => dispatch(createProduct(values)),
  loadTags: () => dispatch(loadTags()),
  loadCategories: () => dispatch(loadCategories()),
  loadCurrencies: () => dispatch(loadCurrencies()),
  loadProductTypes: () => dispatch(loadProductTypes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreate);
