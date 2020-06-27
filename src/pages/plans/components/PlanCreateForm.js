import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';

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

  return (
    <Form name="plans_create" initialValues={data} {...formItemLayout} onFinish={onFinish}>
      <Form.Item
        label="Name"
        name="plan_name"
        rules={[
          {
            required: true,
            message: 'Please enter plan name!',
          },
        ]}
      >
        <Input placeholder="Ex. Premium" />
      </Form.Item>

      <Form.Item
        label="Info"
        name="plan_info"
        rules={[
          {
            required: true,
            message: 'Please enter plan info!',
          },
        ]}
      >
        <Input placeholder="Ex. Allows users to access premium content" />
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

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PlanCreateForm;
