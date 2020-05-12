import React from 'react';
import { Form, Input, Button, notification, Select } from 'antd';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const children_1 = [];
const children_2 = [];
const children_3 = [];
const currency = ['INR', 'USD', 'EUR', 'YEN', 'AUD'];
const categories = [
  'crime-in-india',
  'crime-in-ap',
  'crime-in-telangana',
  'sport',
  'sport-cricket',
  'sport-football',
];

const tags = ['crime', 'muder', 'scam', 'cricket', 'football', 'badminton'];

for (let i = 0; i < 6; i++) {
  children_1.push(<Option key={i}>{categories[i]}</Option>);
}

for (let i = 0; i < 6; i++) {
  children_2.push(<Option key={i}>{tags[i]}</Option>);
}

for (let i = 0; i < 5; i++) {
  children_3.push(<Option key={i}>{currency[i]}</Option>);
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

const ProductCreate = (props) => {
  const onFinish = (values) => {
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
        props.history.push(`${process.env.PUBLIC_URL}/products`);
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
        >
          {children_3}
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
        name="category"
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
        >
          {children_1}
        </Select>
      </Form.Item>

      <Form.Item
        label="Tag"
        name="tag"
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
        >
          {children_2}
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
