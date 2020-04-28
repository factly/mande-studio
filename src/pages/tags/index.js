import React, { useState } from "react";
import { Table, Input, Button, Popconfirm, Form } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please enter ${title}!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Tags = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");

  React.useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/tags")
      .then((data) => data.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue(record);
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const index = data.findIndex((item) => item.id === key);

      if (index > -1) {
        const item = data[index];
        fetch(process.env.REACT_APP_API_URL + "/tags/" + item.id, {
          method: "PUT",
          body: JSON.stringify(row),
        })
          .then((res) => {
            if (res.status === 200) {
              const newData = [...data];
              newData.splice(index, 1, res.json());
              setData(newData);
              setEditingKey("");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (err) {
      console.log("Validate Failed:", err);
    }
  };

  const deleteTag = (key) => {
    const index = data.findIndex((item) => item.id === key);
    if (index > -1) {
      fetch(process.env.REACT_APP_API_URL + "/tags/" + key, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.status === 200) {
            const newData = [...data];
            newData.splice(index, 1);
            setData(newData)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      width: "25%",
      editable: true,
    },
    {
      title: "Slug",
      dataIndex: "slug",
      width: "25%",
      editable: true,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      width: "25%",
      render: (_, record) => {
        return (
          <span title={record.created_at}>
            {moment(record.created_at).local().fromNow()}
          </span>
        );
      },
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Button>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button icon={<CloseOutlined />}>Cancel</Button>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Button
              type="primary"
              icon={<EditOutlined />}
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
              style={{
                marginRight: 8,
              }}
            >
              Edit
            </Button>
            <Popconfirm
              disabled={editingKey !== ""}
              title="Sure to delete?"
              onConfirm={deleteTag(record.id)}
            >
              <Button disabled={editingKey !== ""} icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <Link to="/tags/create">
        <Button type="primary" style={{ marginBottom: 16 }}>
          Add Tag
        </Button>
      </Link>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          rowKey="id"
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  );
};

export default Tags;
