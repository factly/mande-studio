import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const DatasetFormatForm = ({ onSubmit, prev }) => {
  const onFinish = (values) => {
    values.urls.map((url) => {
      onSubmit(url)
        .then(() => {
          notification.success({
            message: 'Success',
            description: 'Dataset Format succesfully added',
          });
        })
        .catch(() => {
          notification.error({
            message: 'Error',
            description: 'Something went wrong',
          });
        });
    });
  };

  return (
    <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
      <Form.List name="urls">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Form.Item {...formItemLayout} label={'URL'} required={false} key={field.key}>
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please input URL or delete this field.',
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="url to dataset" style={{ width: '60%' }} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      style={{ margin: '0 8px' }}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: '60%' }}
                >
                  <PlusOutlined />
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" onClick={prev}>
          Back
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DatasetFormatForm;
