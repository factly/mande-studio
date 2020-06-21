import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Form, Input, Button, notification, Select } from 'antd';

import { loadTags } from '../../../actions/tags';
import { loadCurrencies } from '../../../actions/currencies';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const ProductCreateForm = ({ onSubmit, data = {} }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { tags, currencies } = useSelector(({ tags, currencies }) => {
    return {
      tags: Object.values(tags.items),
      currencies: Object.values(currencies.items),
    };
  });

  React.useEffect(() => {
    dispatch(loadTags());
    dispatch(loadCurrencies());
  }, []);

  const onFinish = (values) => {
    values.currency_id = parseInt(values.currency_id);
    values.price = parseInt(values.price);
    values.tag_ids = values.tag_ids.map((id) => parseInt(id));

    onSubmit(values)
      .then(() => {
        notification.success({
          message: 'Success',
          description: 'Product added succesfully',
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

  return (
    <Form name="products_create" initialValues={data} {...formItemLayout} onFinish={onFinish}>
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
        <Input placeholder="Ex. Crime In India" />
      </Form.Item>

      <Form.Item
        label="Slug"
        name="slug"
        rules={[
          {
            required: true,
            message: 'Please enter slug!',
          },
        ]}
      >
        <Input placeholder="Ex. crime-in-india" />
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
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="Select currency"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {currencies.length > 0
            ? currencies.map((currency) => (
                <Option key={currency.id} value={currency.id}>
                  {currency.iso_code}
                </Option>
              ))
            : []}
        </Select>
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
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Select tags"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {tags.length > 0
            ? tags.map((tag) => (
                <Option key={tag.id} value={tag.id}>
                  {tag.slug}
                </Option>
              ))
            : []}
        </Select>
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

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductCreateForm;
