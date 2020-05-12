import React from 'react';
import { Form, Input, Button, notification } from 'antd';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const StatusCreate = (props) => {
  const onFinish = (values) => {
    fetch(process.env.REACT_APP_API_URL + `/products/${1}/status`, {
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
          description: 'Status succesfully added',
        });
        props.history.push(`${process.env.PUBLIC_URL}/products/status`);
      })
      .catch((res) => {
        notification.error({
          message: 'Error',
          description: 'Something went wrong',
        });
      });
  };

  return (
    <Form name="status_create" {...formItemLayout} onFinish={onFinish}>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter status!',
          },
        ]}
      >
        <Input placeholder="Ex. Available" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StatusCreate;
