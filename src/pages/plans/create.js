import React from 'react';
import { Form, Input, Button, notification } from 'antd';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const PlanCreate = (props) => {
  const onFinish = (values) => {
    fetch(process.env.REACT_APP_API_URL + '/plans', {
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
          description: 'Plan added succesfully',
        });
        props.history.push('/plans');
      })
      .catch((res) => {
        notification.error({
          message: 'Error',
          description: 'Something went wrong',
        });
      });
  };

  return (
    <Form name="plans_create" {...formItemLayout} onFinish={onFinish}>
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

export default PlanCreate;
