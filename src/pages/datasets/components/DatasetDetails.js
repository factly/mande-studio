import React from 'react';
import { useHistory } from 'react-router-dom';
import { Descriptions, Card } from 'antd';
import moment from 'moment';
import { EditOutlined } from '@ant-design/icons';

const DatasetDetails = ({ dataset }) => {
  const history = useHistory();
  return (
    <Card>
      <Descriptions
        title={dataset.title}
        column={1}
        extra={
          <EditOutlined
            key="edit"
            style={{ fontSize: '150%' }}
            onClick={() => history.push(`/datasets/${dataset.id}/edit`)}
          />
        }
        bordered
      >
        <Descriptions.Item label="Organisation">{dataset.organisation}</Descriptions.Item>
        <Descriptions.Item label="Sectors">{dataset.sectors}</Descriptions.Item>
        <Descriptions.Item label="Contact email">{dataset.contact_email}</Descriptions.Item>
        <Descriptions.Item label="Contact name">{dataset.contact_name}</Descriptions.Item>
        <Descriptions.Item label="Data standard">{dataset.data_standard}</Descriptions.Item>
        <Descriptions.Item label="Description">
          <div
            style={{ whiteSpace: 'pre-wrap' }}
            dangerouslySetInnerHTML={{ __html: dataset.description }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Units">
          <div
            style={{ whiteSpace: 'pre-wrap' }}
            dangerouslySetInnerHTML={{ __html: dataset.units }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Frequency">{dataset.frequency}</Descriptions.Item>
        <Descriptions.Item label="Granularity">{dataset.granularity}</Descriptions.Item>
        <Descriptions.Item label="License">{dataset.license}</Descriptions.Item>
        <Descriptions.Item label="Related articles">{dataset.related_articles}</Descriptions.Item>
        <Descriptions.Item label="Source">{dataset.source}</Descriptions.Item>
        <Descriptions.Item label="Source Link">{dataset.source_link}</Descriptions.Item>
        <Descriptions.Item label="Archive Link">{dataset.archive_link}</Descriptions.Item>
        <Descriptions.Item label="Temporal coverage">{dataset.temporal_coverage}</Descriptions.Item>
        <Descriptions.Item label="Time saved">{dataset.time_saved}</Descriptions.Item>
        <Descriptions.Item label="Profiling URL">
          <a>{dataset.profiling_url}</a>
        </Descriptions.Item>
        <Descriptions.Item label="Is Public">{dataset.is_public ? 'yes' : 'no'}</Descriptions.Item>
        <Descriptions.Item label="Created At">
          {moment(dataset.created_at).format('Do MMMM YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="Last Updated At">
          {moment(dataset.updated_at).format('Do MMMM YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="Next Update">
          {dataset.next_update ? moment(dataset.next_update).format('Do MMMM YYYY') : null}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default DatasetDetails;
