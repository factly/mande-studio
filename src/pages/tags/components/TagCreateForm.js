import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';
import { checker, maker } from '../../../utils/sluger';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const TagCreateForm = ({ onSubmit, data = {} }) => {
  const [form] = Form.useForm();

  const history = useHistory();

  const onFinish = (values) => {
    onSubmit(values)
      .then(() => {
        notification.success({
          message: 'Success',
        });
        history.push('/tags');
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'Something went wrong',
        });
      });
  };

  const onTitleChange = (string) => {
    form.setFieldsValue({
      slug: maker(string),
    });
  };

  return (
    <Form
      form={form}
      name="tags_create"
      initialValues={data}
      {...formItemLayout}
      onFinish={onFinish}
    >
      <Form.Item
        label="Name"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please enter name!',
          },
        ]}
      >
        <Input placeholder="Ex. Crime In India" onChange={(e) => onTitleChange(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Slug"
        name="slug"
        rules={[
          {
            required: true,
            message: 'Please enter slug!',
          },
          {
            pattern: checker,
            message: 'Please enter valid slug!',
          },
        ]}
      >
        <Input placeholder="Ex. crime-in-india" />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TagCreateForm;
