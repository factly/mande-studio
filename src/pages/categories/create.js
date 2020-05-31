import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Button, notification } from 'antd';

import { createCategory } from '../../actions/categories';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const CategoryCreate = (props) => {
  const { create } = props;

  const onFinish = (values) => {
    create(values)
      .then(() => {
        notification.success({
          message: 'Success',
          description: 'Category succesfully added',
        });
        props.history.push('/categories');
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'Something went wrong',
        });
      });
  };

  return (
    <Form name="categories_create" {...formItemLayout} onFinish={onFinish}>
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

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

CategoryCreate.propTypes = {
  create: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  create: (values) => dispatch(createCategory(values)),
});

export default connect(null, mapDispatchToProps)(CategoryCreate);
