import React from 'react';
import { useHistory } from 'react-router-dom';

import { Form, Input, Button, notification, Select } from 'antd';

import Selector from '../../../components/Selector';
import { maker, checker } from '../../../utils/sluger';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const ProductCreateForm = ({ onSubmit, data = {} }) => {
  const history = useHistory();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    values.currency_id = parseInt(values.currency_id);
    values.price = parseInt(values.price);
    values.tag_ids = values.tag_ids.map((id) => parseInt(id));

    onSubmit(values)
      .then(() => {
        notification.success({
          message: 'Success',
        });
        history.push('/products');
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
      name="products_create"
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
            message: 'Please enter title!',
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
        <Input type="number" placeholder="Ex. 1999" />
      </Form.Item>

      <Form.Item
        label="Tag"
        name="tag_ids"
        rules={[
          {
            required: true,
            message: 'Please select atleast one tag!',
          },
        ]}
      >
        <Selector action="Tags" multiple={true} field="title" />
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        rules={[
          {
            required: true,
            message: 'Please enter status!',
          },
        ]}
      >
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="Select status"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option key={1} value={'Show'}>
            Show
          </Option>
          <Option key={2} value={'Hide'}>
            Hide
          </Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Datasets"
        name="dataset_ids"
        rules={[
          {
            required: true,
            message: 'Please select atleast one dataset!',
          },
        ]}
      >
        <Selector action="Datasets" multiple={true} field="title" />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductCreateForm;
