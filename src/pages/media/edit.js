import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Row, Col, Skeleton, Form, Input, Button, notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getMedium, updateMedium } from '../../actions/media';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function MediaEdit() {
  const [form] = Form.useForm();
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { media, loading } = useSelector(({ media }) => {
    return {
      media: media.items[id],
      loading: media.loading,
    };
  });

  React.useEffect(() => {
    dispatch(getMedium(id));
  }, [id]);

  const updateMedia = (values) => {
    const data = {
      ...media,
      ...values,
    };
    dispatch(updateMedium(id, data))
      .then(() => {
        notification.success({
          message: 'Success',
        });
        history.push('/media');
      })
      .catch((error) => {
        console.log(error);
        console.notification.error({
          message: 'Error',
          description: 'Something went wrong',
        });
      });
  };

  if (loading) return <Skeleton />;
  return (
    <Row>
      <Col span={'12'}>
        <img src={media.url} alt={'space'} style={{ width: '100%' }} />
      </Col>
      <Col span={'12'}>
        <Form
          {...layout}
          form={form}
          name="create-space"
          onFinish={(values) => {
            updateMedia(values);
          }}
          initialValues={media}
        >
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="alt_text" label="Alt Text">
            <Input />
          </Form.Item>
          <Form.Item name="caption" label="Caption">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default MediaEdit;
