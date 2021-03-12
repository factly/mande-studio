import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Select, notification, Switch } from 'antd';

import Selector from '../../../components/Selector';
import MediaUploader from '../../media/components/MediaUpload';
import Uploader from '../../../components/Uploader';
import TextEdior from '../../../components/TextEditor';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const DatasetForm = ({ onSubmit, setDatasetId, data, next }) => {
  const [form] = Form.useForm();
  const [media, setMedia] = useState(data?.feature_media);

  const formFields = [
    { label: 'Title', name: 'title', placeholder: 'Dataset title', required: true },
    {
      label: 'Contact Email',
      name: 'contact_email',
      placeholder: 'shashi@factly.in',
      required: true,
      type: 'email',
    },
    { label: 'Contact Name', name: 'contact_name', placeholder: 'Shashi', required: true },
    { label: 'Description', name: 'description', placeholder: 'description' },
    { label: 'Data Standard', name: 'data_standard', placeholder: 'standard' },
    { label: 'Price', type: 'number', name: 'price', placeholder: '1000', required: true },
    { label: 'Currency', name: 'currency_id', placeholder: 'INR', required: true },
    { label: 'Frequency', name: 'frequency', placeholder: '1 month', required: true },
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

  const onUploadSuccess = (media) => {
    setMedia(media);
  };

  const onFinish = (values) => {
    values.frequency = `${values.frequency.count} ${values.frequency.units}`;
    if (media) values.featured_media_id = media.id;

    onSubmit(values)
      .then((data) => {
        setDatasetId(data.id);
        notification.success({
          message: 'Success',
        });
        next();
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: 'Error',
          description: 'Something went wrong',
        });
      });
  };

  const [profiling_url, setProfilingURL] = useState(data?.profiling_url);

  const onUpload = (data) => {
    form.setFieldsValue({
      profiling_url: data[0]?.uploadURL,
    });
    setProfilingURL(data[0]?.uploadURL);
  };

  return (
    <Form
      form={form}
      name="datasets_create_step_one"
      initialValues={data}
      {...formItemLayout}
      onFinish={onFinish}
    >
      {formFields.map((field) => (
        <Form.Item
          key={field.name}
          label={field.label}
          name={field.name}
          rules={
            field.required && [
              {
                required: true,
                message: `Please enter ${field.label}!`,
              },
            ]
          }
        >
          {field.type === 'number' ? (
            <InputNumber placeholder={field.placeholder} />
          ) : field.name === 'currency_id' ? (
            <Selector action="Currencies" field="iso_code" />
          ) : field.name === 'frequency' ? (
            <Input.Group compact>
              <Form.Item
                name={['frequency', 'count']}
                noStyle
                rules={[{ required: true, message: 'Frequency count is required' }]}
              >
                <InputNumber min={1} style={{ width: '15%' }} placeholder="12" />
              </Form.Item>
              <Form.Item
                name={['frequency', 'units']}
                noStyle
                rules={[{ required: true, message: 'Frequency unit is required' }]}
              >
                <Select placeholder="Select Unit">
                  <Option value="days">Days</Option>
                  <Option value="months">Months</Option>
                  <Option value="years">Years</Option>
                </Select>
              </Form.Item>
            </Input.Group>
          ) : field.name === 'description' ? (
            <TextEdior placeholder="Enter decription" />
          ) : (
            <Input placeholder={field.placeholder} type={field.type || ''} />
          )}
        </Form.Item>
      ))}
      <Form.Item name={'is_public'} label={'Is Public'} valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item name={'profiling_url'} label={'Profiling URL'}>
        {/* {media && media.name} */}
        {!profiling_url ? <Uploader onUploadSuccess={onUpload} /> : profiling_url}
      </Form.Item>
      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DatasetForm;
