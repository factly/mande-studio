import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loading = (props) => {
  const loadingIcon = <LoadingOutlined style={{ fontSize: props.size || 24 }} spin />;

  return <Spin indicator={loadingIcon} />;
};

export default Loading;
