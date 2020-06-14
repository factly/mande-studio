import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Button, notification } from 'antd';

import { createCurrency } from '../../actions/currencies';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const CurrencyCreate = (props) => {
  const { create } = props;

  const onFinish = (values) => {
    create(values)
      .then(() => {
        notification.success({
          message: 'Success',
          description: 'Currency succesfully added',
        });
        props.history.push('/currencies');
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'Something went wrong',
        });
      });
  };

  return (
    <Form name="currencies_create" {...formItemLayout} onFinish={onFinish}>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter name!',
          },
        ]}
      >
        <Input placeholder="Ex. Indian Rupee" />
      </Form.Item>

      <Form.Item
        label="ISO Code"
        name="iso_code"
        rules={[
          {
            required: true,
            message: 'Please enter iso code!',
          },
        ]}
      >
        <Input placeholder="Ex. INR" />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

CurrencyCreate.propTypes = {
  create: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  create: (values) => dispatch(createCurrency(values)),
});

export default connect(null, mapDispatchToProps)(CurrencyCreate);
