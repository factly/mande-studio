import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Descriptions, List, Card, Popconfirm, notification } from 'antd';
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { loadDatasets, deleteDataset } from '../../../actions/datasets';

const DatasetItem = ({ dataset }) => {
  return (
    <Descriptions layout="horizontal" column={1}>
      <Descriptions.Item label="Contact email">{dataset.contact_email}</Descriptions.Item>
      <Descriptions.Item label="Contact name">{dataset.contact_name}</Descriptions.Item>
      <Descriptions.Item label="License">{dataset.license}</Descriptions.Item>
      <Descriptions.Item label="Source">{dataset.source}</Descriptions.Item>
    </Descriptions>
  );
};

const DatasetsList = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 4 });

  const history = useHistory();
  const dispatch = useDispatch();
  const { data, total } = useSelector(({ datasets }) => {
    const { ids, items, total } = datasets;
    return {
      data: ids.map((id) => items[id]),
      total,
    };
  });

  React.useEffect(() => {
    dispatch(loadDatasets(pagination.page, pagination.limit));
  }, [pagination]);

  const remove = (key) => {
    dispatch(deleteDataset(key))
      .then(() => {
        notification.success({
          message: 'Success',
        });
        dispatch(loadDatasets(pagination.page, pagination.limit));
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'Something went wrong',
        });
      });
  };

  const actions = (id) => [
    <EditOutlined key="edit" onClick={() => history.push(`/datasets/${id}/edit`)} />,
    <Popconfirm title="Sure to delete?" onConfirm={() => remove(id)}>
      <DeleteOutlined key="delete" />
    </Popconfirm>,
  ];

  return (
    <List
      dataSource={data}
      grid={{ gutter: 16, column: 2 }}
      pagination={{
        current: pagination.page,
        defaultPageSize: 4,
        pageSize: pagination.limit,
        total,
        onChange: (page, limit) => setPagination({ page, limit }),
      }}
      renderItem={(dataset) => (
        <List.Item key={dataset.id}>
          <Card
            hoverable
            actions={actions(dataset.id)}
            title={<Link to={`/datasets/${dataset.id}`}>{dataset.title}</Link>}
            bordered={false}
            cover={<img alt={dataset.featured_media?.alt_text} src={dataset.featured_media?.url} />}
          >
            <DatasetItem dataset={dataset} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default DatasetsList;
