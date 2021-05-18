import React from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { Form, Input, InputNumber, DatePicker, Button, notification } from 'antd';

import Selector from '../../../components/Selector';
import { maker, checker } from '../../../utils/sluger';
import MediaSelector from '../../../components/MediaSelector';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const CatalogCreateForm = ({ onSubmit, data = {} }) => {
  const history = useHistory();
  const [form] = Form.useForm();

  if (data.id) {
    data = {
      ...data,
      product_ids: data.products,
      published_date: moment(data.published_date),
    };
  }

  const onFinish = (values) => {
    values.published_date = moment(values.published_date).format('YYYY-MM-DDTHH:mm:ssZ');
    onSubmit(values)
      .then(() => {
        notification.success({
          message: 'Success',
        });
        history.push('/catalogs');
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
      name="catalogs_create"
      initialValues={data}
      {...formItemLayout}
      onFinish={onFinish}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please enter catalog name!',
          },
        ]}
      >
        <Input placeholder="Ex. Cricket" onChange={(e) => onTitleChange(e.target.value)} />
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
        <Input placeholder="Ex. cricket" />
      </Form.Item>

      <Form.Item
        label="Currency"
        name="currency_id"
        rules={[
          {
            required: true,
            message: 'Please enter currency!',
          },
        ]}
      >
        <Selector action="Currencies" field="iso_code" />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[
          {
            required: true,
            message: 'Please enter price!',
          },
        ]}
      >
        <InputNumber placeholder="Ex. 1999" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please enter catalog description!',
          },
        ]}
      >
        <Input.TextArea placeholder="Ex. Package of datasets of Indian cricket" />
      </Form.Item>

      <Form.Item
        label="Products"
        name="product_ids"
        rules={[
          {
            required: true,
            message: 'Please select atleast one tag!',
          },
        ]}
      >
        <Selector action="Products" multiple={true} field="title" />
      </Form.Item>

      <Form.Item label="Published date" name="published_date">
        <DatePicker />
      </Form.Item>

      <Form.Item label="Featured Image" name="featured_medium_id">
        <MediaSelector />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CatalogCreateForm;
