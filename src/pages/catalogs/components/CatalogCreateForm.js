import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Form, Input, InputNumber, DatePicker, Select, Button, notification } from 'antd';

import { loadProducts } from '../../../actions/products';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const CatalogCreateForm = ({ onSubmit, data }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { products } = useSelector(({ products }) => ({
    products: Object.values(products.items),
  }));

  if (data.id) {
    data.product_ids = data.products;
    data.published_date = moment(data.published_date);
  }

  React.useEffect(() => {
    dispatch(loadProducts());
  }, []);

  const onFinish = (values) => {
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
        <Input placeholder="Ex. Package of datasets of Indian cricket" />
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
        <InputNumber min={0} placeholder="Ex. 1999" />
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
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Select products"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {products.length > 0
            ? products.map((product) => (
                <Option key={product.id} value={parseInt(product.id)}>
                  {product.title}
                </Option>
              ))
            : []}
        </Select>
      </Form.Item>

      <Form.Item
        label="Published date"
        name="published_date"
        rules={[
          {
            required: true,
            message: 'Please select date of publishing!',
          },
        ]}
      >
        <DatePicker format="YYYY-MM-DDTHH:mm:ssZ" />
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
