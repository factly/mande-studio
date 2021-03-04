import React from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { Form, Input, InputNumber, DatePicker, Button, notification } from 'antd';

import Selector from '../../../components/Selector';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const CatalogCreateForm = ({ onSubmit, data = {} }) => {
  const history = useHistory();

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

  return (
    <Form name="catalogs_create" initialValues={data} {...formItemLayout} onFinish={onFinish}>
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
        <Input placeholder="Ex. Cricket" />
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

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CatalogCreateForm;
