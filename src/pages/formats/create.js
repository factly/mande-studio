import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Button, Switch, notification } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

import { createFormat } from '../../actions/formats';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const FormatCreate = (props) => {
  const { create } = props;

  const onFinish = (values) => {
    create(values)
      .then(() => {
        notification.success({
          message: 'Success',
          description: 'Format added succesfully',
        });
        props.history.push('/formats');
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'Something went wrong',
        });
      });
  };

  return (
    <Form
      name="formats_create"
      {...formItemLayout}
      initialValues={{ is_default: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter format name!',
          },
        ]}
      >
        <Input placeholder="Ex. PDF" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please enter format description!',
          },
        ]}
      >
        <Input placeholder="Ex. Locked file" />
      </Form.Item>

      <Form.Item
        label="Is Default"
        name="is_default"
        rules={[
          {
            required: true,
            message: 'Please select an option!',
          },
        ]}
      >
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked
        />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

FormatCreate.propTypes = {
  create: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  create: (values) => dispatch(createFormat(values)),
});

export default connect(null, mapDispatchToProps)(FormatCreate);
