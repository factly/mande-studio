import React from 'react';
import { Form, Input, Button, notification } from 'antd';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const CurrencyCreate = (props) => {
  const onFinish = (values) => {
    fetch(process.env.REACT_APP_API_URL + '/currencies', {
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
          description: 'Currency succesfully added',
        });
        props.history.push('/currencies');
      })
      .catch((res) => {
        notification.error({
          message: 'Error',
          description: 'Something went wrong',
        });
      });
  };

  return (
    <Form name="currencies_create" {...formItemLayout} onFinish={onFinish}>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter name!',
          },
        ]}
      >
        <Input placeholder="Ex. Indian Rupee" />
      </Form.Item>

      <Form.Item
        label="ISO Code"
        name="iso_code"
        rules={[
          {
            required: true,
            message: 'Please enter iso code!',
          },
        ]}
      >
        <Input placeholder="Ex. INR" />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CurrencyCreate;
