import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, InputNumber, Button, Switch, notification } from 'antd';
import Selector from '../../../components/Selector';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const PlanCreateForm = ({ onSubmit, data = {} }) => {
  const [allProducts, setAllProducts] = React.useState(false);
  const history = useHistory();

  const toggleAllProducts = () => {
    setAllProducts(!allProducts);
  };

  const onFinish = (values) => {
    if (allProducts) {
      values.catalogs = [];
    }

    onSubmit(values)
      .then(() => {
        notification.success({
          message: 'Success',
        });
        history.push('/plans');
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'Something went wrong',
        });
      });
  };

  return (
    <Form name="plans_create" initialValues={data} {...formItemLayout} onFinish={onFinish}>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter plan name!',
          },
        ]}
      >
        <Input placeholder="Ex. Premium" />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea placeholder="Ex. Allows users to access premium content" />
      </Form.Item>

      <Form.Item
        label="Currency"
        name="currency_id"
        rules={[
          {
            required: true,
            message: 'Please select currency!',
          },
        ]}
      >
        <Selector action="Currencies" field="iso_code" />
      </Form.Item>

      <Form.Item
        label="Users"
        name="users"
        rules={[
          {
            required: true,
            message: 'Please enter no. of users!',
          },
        ]}
      >
        <InputNumber placeholder="Ex. 5" />
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
        <InputNumber placeholder="Ex. 1999" />
      </Form.Item>

      <Form.Item
        label="Duration"
        name="duration"
        rules={[
          {
            required: true,
            message: 'Please enter duration!',
          },
        ]}
      >
        <InputNumber placeholder="Ex. 30" />
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
        <Input placeholder="Ex. Pending" />
      </Form.Item>

      <Form.Item label="All Catalogs" name="all_products">
        <Switch onChange={toggleAllProducts} />
      </Form.Item>

      <Form.Item hidden={allProducts} label="Catalogs" name="catalogs">
        <Selector action="Catalogs" multiple={true} field="id" />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PlanCreateForm;
