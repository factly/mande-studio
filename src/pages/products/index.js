import React from "react";
import { Link } from "react-router-dom";

import { Table, Tag, Button, Select } from 'antd';
import { DeleteOutlined, PauseOutlined, CaretRightOutlined } from "@ant-design/icons";

function Products(){
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, data) => <Link to={"/products/"+data.key}>{text}</Link>,
    },
    {
      title: 'Points',
      dataIndex: 'points',
      key: 'points',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
            return (
              <Tag color={tag} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: text => (
        <Select defaultValue={text} >
          <Select.Option Option value="archive"><DeleteOutlined /> Archive</Select.Option>
          <Select.Option value="hidden"><PauseOutlined /> Hidden</Select.Option>
          <Select.Option value="publish"><CaretRightOutlined /> Publish</Select.Option>
        </Select>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'MOSPI - Agri',
      points: 32,
      tags: ['geekblue', 'red'],
      status: 'hidden',
    },
    {
      key: '2',
      name: 'MOSPI - Vehicle',
      points: 42,
      tags: ['orange', 'lime', 'gold'],
      status: 'archive',
    },
    {
      key: '3',
      name: 'MOSPI - Economy',
      points: 32,
      tags: ['green', 'pink'],
      status: 'publish',
    },
  ];

  return (
    <div>
      <Link to="/products/create">   
        <Button type="primary" style={{ marginBottom: 16 }}>
          Add Product
        </Button>
      </Link>
      <Table
        columns={columns} 
        dataSource={data} 
      />
    </div>
  )
}

export default Products