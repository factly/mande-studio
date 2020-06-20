import React from 'react';
import { Form, Input, InputNumber, Button, notification } from 'antd';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const DatasetForm = ({ onSubmit, setDatasetId, next }) => {
  const formFields = [
    { label: 'Title', name: 'title', placeholder: 'Dataset title' },
    { label: 'Contact Email', name: 'contact_email', placeholder: 'shashi@factly.in' },
    { label: 'Contact Name', name: 'contact_name', placeholder: 'Shashi' },
    { label: 'Description', name: 'description', placeholder: 'description' },
    { label: 'Data Standard', name: 'data_standard', placeholder: 'standard' },
    { label: 'Frequency', name: 'frequency', placeholder: '1 month' },
    { label: 'Granularity', name: 'granularity', placeholder: 'granularity' },
    { label: 'License', name: 'license', placeholder: 'MIT License' },
    {
      label: 'Related Articles',
      name: 'related_articles',
      placeholder: 'link://to.related.articles',
    },
    { label: 'Source', name: 'source', placeholder: 'link://to.source.com' },
    { label: 'Temporal Coverage', name: 'temporal_coverage', placeholder: 'temporal_coverage' },
    { label: 'Time Saved', type: 'number', name: 'time_saved', placeholder: '12' },
  ];

  const onFinish = (values) => {
    onSubmit(values)
      .then((data) => {
        setDatasetId(data.id);
        notification.success({
          message: 'Success',
          description: 'Dataset succesfully added',
        });
        next();
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'Something went wrong',
        });
      });
  };

  return (
    <Form name="datasets_create_step_one" {...formItemLayout} onFinish={onFinish}>
      {formFields.map((field) => (
        <Form.Item
          key={field.name}
          label={field.label}
          name={field.name}
          rules={[
            {
              required: true,
              message: `Please enter ${field.label}!`,
            },
          ]}
        >
          {field.type === 'number' ? (
            <InputNumber placeholder={field.placeholder} />
          ) : (
            <Input placeholder={field.placeholder} />
          )}
        </Form.Item>
      ))}
      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Create Dataset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DatasetForm;
