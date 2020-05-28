import React, { useState } from 'react';
import { Form, Input, Button, notification, Select } from 'antd';
import { useParams } from 'react-router-dom';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const ProductEdit = (props) => {
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [productType, setProductType] = useState([]);
  const [product, setProduct] = useState();

  const { id } = useParams();
  React.useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/products/${id}`)
      .then((data) => data.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        notification.error({
          message: 'Error',
          description: 'Something went wrong',
        });
      });
    fetch(process.env.REACT_APP_API_URL + '/tags')
      .then((data) => data.json())
      .then((data) => {
        setTags(data.nodes);
      });
    fetch(process.env.REACT_APP_API_URL + '/categories')
      .then((data) => data.json())
      .then((data) => {
        setCategories(data.nodes);
      });
    fetch(process.env.REACT_APP_API_URL + '/currencies')
      .then((data) => data.json())
      .then((data) => {
        setCurrencies(data.nodes);
      });
    fetch(process.env.REACT_APP_API_URL + '/types')
      .then((data) => data.json())
      .then((data) => {
        setProductType(data.nodes);
      });
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

    fetch(process.env.REACT_APP_API_URL + `/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .then((_) => {
        notification.success({
          message: 'Success',
          description: 'Product succesfully updated',
        });
        props.history.push('/products');
      })
      .catch((err) => {
        notification.error({
          message: 'Error',
          description: 'Something went wrong',
        });
      });
  };

  const initialValues = {
    slug: product ? product.slug : '',
    title: product ? product.title : '',
    price: product ? product.price : '',
    currency_id: product ? product.Currency.id : '',
    category_ids: product ? product.categories.map((category) => category.id) : [],
    tag_ids: product ? product.tags.map((tag) => tag.id) : [],
    status: product ? product.status : '',
    product_type_id: product ? product.ProductType.id : '',
  };

  return !product ? null : (
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
        <Input placeholder="Ex. 1999" />
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
          {productType.length > 0
            ? productType.map((product) => (
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

export default ProductEdit;
