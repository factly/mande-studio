import React from "react";
import { Link } from "react-router-dom";

import { Table, Button, Select } from 'antd';
import { DeleteOutlined, CaretRightOutlined } from "@ant-design/icons";

function Tags(){

  const [tags, setTags] = React.useState([])

  React.useEffect(()=>{
    fetch(process.env.REACT_APP_API_URL + '/tags')
    .then(data => data.json())
    .then(data => {
      setTags(data)
    })
  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
      render: (text, data) => <Link to={"/tags/"+data.id}>{text}</Link>,
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      render: (text, data) => <Link to={"/tags/"+data.id}>{text}</Link>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: () => (
        <Select defaultValue="publish" >
          <Select.Option Option value="archive"><DeleteOutlined /> Archive</Select.Option>
          <Select.Option value="publish"><CaretRightOutlined /> Publish</Select.Option>
        </Select>
      ),
    },
  ];

  return (
    <div>
      <Link to="/tags/create">   
        <Button type="primary" style={{ marginBottom: 16 }}>
          Add Tag
        </Button>
      </Link>
      <Table
        rowKey="id"
        columns={columns} 
        dataSource={tags} 
      />
    </div>
  )
}

export default Tags