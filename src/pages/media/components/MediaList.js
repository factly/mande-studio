import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { List, Card, Popconfirm, notification } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import '../../styles.css';
import { loadMedia, deleteMedium } from '../../../actions/media';

const MediaList = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 4 });

  const history = useHistory();
  const dispatch = useDispatch();
  const { data, total } = useSelector(({ media }) => {
    const { ids, items, total } = media;
    return {
      data: ids.map((id) => items[id]),
      total,
    };
  });

  React.useEffect(() => {
    dispatch(loadMedia(pagination.page, pagination.limit));
  }, [pagination, total]);

  const remove = (key) => {
    dispatch(deleteMedium(key))
      .then(() => {
        notification.success({
          message: 'Success',
        });
        dispatch(loadMedia(pagination.page, pagination.limit));
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'Something went wrong',
        });
      });
  };

  const actions = (id) => [
    <EditOutlined key="edit" onClick={() => history.push(`/media/${id}/edit`)} />,
    <Popconfirm title="Sure to delete?" onConfirm={() => remove(id)}>
      <DeleteOutlined key="delete" />
    </Popconfirm>,
  ];

  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={data}
      pagination={{
        current: pagination.page,
        defaultPageSize: 4,
        pageSize: pagination.limit,
        total,
        onChange: (page, limit) => setPagination({ page, limit }),
      }}
      renderItem={(medium) => (
        <List.Item key={medium.id}>
          <Card
            hoverable
            actions={actions(medium.id)}
            cover={<img className="photo" alt={medium.alt_text} src={medium.url} />}
          >
            <Card.Meta
              title={<a href={medium.href}>{medium.title}</a>}
              description={medium.caption}
            />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default MediaList;
