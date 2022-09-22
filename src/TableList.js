import { Space, Table, Tag, Button, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React from "react";
import * as dayjs from "dayjs";

const TableList = (props) => {
  const { confirm } = Modal;

  const tags = ["done", "doing", "fail"];
  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      onOk() {
        console.log("OK");
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "CREATED",
      dataIndex: "created",
      key: "created",
      render: (text) => <p>{dayjs(text).format("DD/MM/YYYY")}</p>,
    },
    {
      title: "DEADLINE",
      dataIndex: "deadline",
      key: "deadline",
      render: (text) => <p>{dayjs(text).format("DD/MM/YYYY")}</p>,
    },
    {
      title: "STATUS",
      key: "status",
      dataIndex: "status",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 4 ? "orange" : "green";

            if (tag === "fail") {
              color = "volcano";
            }

            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button>
            <img src="assets/icons/edit.png" alt="" />
          </button>
          <button onClick={showDeleteConfirm}>
            <img src="assets/icons/delete.png" alt="" />
          </button>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "Hieu",
      created: "",
      deadline: "",
      tags: ["done"],
    },
    {
      key: "2",
      name: "",
      created: "",
      deadline: "",
      tags: ["fail"],
    },
    {
      key: "3",
      name: "",
      created: "",
      deadline: "",
      tags: ["doing"],
    },
  ];
  return <Table columns={columns} dataSource={props.jobs} />;
};

export default TableList;
