import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Descriptions, List, Card, Popconfirm, notification } from 'antd';
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { loadDatasets, deleteDataset } from '../../../actions/datasets';

// "featured_media_id": 0,
// "format": 0,
// "format_ids": [
//   0
// ],

const DatasetItem = ({ dataset, actions }) => {
  return (
    <Card actions={actions}>
      <Descriptions title={dataset.title}>
        <Descriptions.Item label="Contact email">{dataset.contact_email}</Descriptions.Item>
        <Descriptions.Item label="Contact name">{dataset.contact_name}</Descriptions.Item>
        <Descriptions.Item label="Data standard">{dataset.data_standard}</Descriptions.Item>
        <Descriptions.Item label="Description">{dataset.description}</Descriptions.Item>
        <Descriptions.Item label="Frequency">{dataset.frequency}</Descriptions.Item>
        <Descriptions.Item label="Granularity">{dataset.granularity}</Descriptions.Item>
        <Descriptions.Item label="License">{dataset.license}</Descriptions.Item>
        <Descriptions.Item label="Related articles">{dataset.related_articles}</Descriptions.Item>
        <Descriptions.Item label="Source">{dataset.source}</Descriptions.Item>
        <Descriptions.Item label="Temporal coverage">{dataset.temporal_coverage}</Descriptions.Item>
        <Descriptions.Item label="Time saved">{dataset.time_saved}</Descriptions.Item>
        <Descriptions.Item label="Created At">
          {moment(dataset.created_at).fromNow()}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

const DatasetsList = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });

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
      bordered
      itemLayout="vertical"
      dataSource={data}
      pagination={{
        current: pagination.page,
        defaultPageSize: 5,
        pageSize: pagination.limit,
        total,
        onChange: (page, limit) => setPagination({ page, limit }),
      }}
      renderItem={(dataset) => (
        <List.Item
          key={dataset.id}
          actions={actions(dataset.id)}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta title={dataset.title} description={dataset.description} />
          {/* <DatasetItem dataset={dataset} actions={actions(dataset.id)} /> */}
        </List.Item>
      )}
    />
  );
};

export default DatasetsList;
