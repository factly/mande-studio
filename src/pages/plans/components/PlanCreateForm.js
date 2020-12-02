import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, InputNumber, Button, notification } from 'antd';
import Selector from '../../../components/Selector';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const PlanCreateForm = ({ onSubmit, data = {} }) => {
  const history = useHistory();

  const onFinish = (values) => {
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

  let catalogs =
    data.id && data.catalogs && data.catalogs.length > 0
      ? data.catalogs.map((each) => each.id)
      : [];
  let initialValues = {};
  if (data.id) {
    initialValues = { ...data, catalogs: catalogs };
  }

  return (
    <Form name="plans_create" initialValues={initialValues} {...formItemLayout} onFinish={onFinish}>
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
        <Input placeholder="Ex. Allows users to access premium content" />
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

      <Form.Item label="Catalogs" name="catalogs">
        <Selector action="Catalogs" field="id" />
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
