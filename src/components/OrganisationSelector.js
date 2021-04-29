import React from 'react';
import { useSelector } from 'react-redux';
import { Select, Avatar } from 'antd';

const { Option, OptGroup } = Select;

function SpaceSelector({details}) {
  

  const DEFAULT_IMAGE = 'https://www.tibs.org.tw/images/default.jpg';

   
  return details ?(<Select
      style={{ width: '200px' }}
      value={details.id}
      onChange={() => {}}
      bordered={false}
    >
    <OptGroup key={'org'} label={details.title}>
        <Option key={'space-' + details.id} value={details.id}>
          <Avatar
            size="small"
            src={ DEFAULT_IMAGE}
          />{' '}
          {details.title}
        </Option>
      </OptGroup> 
    </Select>): null
  
}

export default SpaceSelector;
