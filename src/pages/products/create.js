import React, { useState } from 'react';
import { Form, Input, Button, notification, Select } from 'antd';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const ProductCreate = (props) => {
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [productType, setProductType] = useState([]);

  React.useEffect(() => {
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
    fetch(process.env.REACT_APP_API_URL + '/products', {
      method: 'POST',
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .then((_) => {
        notification.success({
          message: 'Success',
          description: 'Product succesfully added',
        });
        props.history.push('/products');
      })
      .catch((res) => {
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
            ? currencies.map((c) => <Option key={c.id}>{c.iso_code}</Option>)
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
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Select categories"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {categories.length > 0 ? categories.map((c) => <Option key={c.id}>{c.slug}</Option>) : []}
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
          {tags.length > 0 ? tags.map((t) => <Option key={t.id}>{t.slug}</Option>) : []}
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
          defaultValue={'Hide'}
          onChange={handleChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option key={'Hide'}>Hide</Option>
          <Option key={'Unhide'}>Unhide</Option>
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
            ? productType.map((p) => <Option key={p.id}>{p.name}</Option>)
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

export default ProductCreate;
