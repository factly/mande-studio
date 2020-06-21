import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const CurrencyCreateForm = ({ onSubmit, data = {} }) => {
  const history = useHistory();

  const onFinish = (values) => {
    onSubmit(values)
      .then(() => {
        notification.success({
          message: 'Success',
          description: 'Currency succesfully added',
        });
        history.push('/currencies');
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'Something went wrong',
        });
      });
  };

  return (
    <Form name="currencies_create" initialValues={data} {...formItemLayout} onFinish={onFinish}>
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

export default CurrencyCreateForm;
