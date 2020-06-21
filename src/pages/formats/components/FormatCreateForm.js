import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Switch, notification } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

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
          description: 'Format added succesfully',
        });
        history.push('/formats');
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'Something went wrong',
        });
      });
  };

  return (
    <Form
      name="formats_create"
      {...formItemLayout}
      initialValues={{ is_default: true, ...data }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter format name!',
          },
        ]}
      >
        <Input placeholder="Ex. PDF" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please enter format description!',
          },
        ]}
      >
        <Input placeholder="Ex. Locked file" />
      </Form.Item>

      <Form.Item
        label="Is Default"
        name="is_default"
        valuePropName="checked"
        rules={[
          {
            required: true,
            message: 'Please select an option!',
          },
        ]}
      >
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked
        />
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
