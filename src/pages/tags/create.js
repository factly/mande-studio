import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Button, notification } from 'antd';

import { createTag } from '../../actions/tags';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const TagCreate = (props) => {
  const { create } = props;

  const onFinish = (values) => {
    create(values)
      .then(() => {
        notification.success({
          message: 'Success',
          description: 'Tag succesfully added',
        });
        props.history.push('/tags');
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'Something went wrong',
        });
      });
  };

  return (
    <Form name="tags_create" {...formItemLayout} onFinish={onFinish}>
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

TagCreate.propTypes = {
  create: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  create: (values) => dispatch(createTag(values)),
});

export default connect(null, mapDispatchToProps)(TagCreate);
