import { Space, Table, Tag, Modal, Form, Select, DatePicker } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import * as dayjs from "dayjs";
import Item from "antd/lib/list/Item";

const TableList = (props) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const showEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleOk = () => {
    setIsEditModalOpen(false);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
  };
  const { confirm } = Modal;

  const tags = ["done", "doing", "fail"];

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
          <button onClick={showEditModal}>
            <img src="assets/icons/edit.png" alt="" />
          </button>

          <button
            onClick={() => {
              showDeleteConfirm(record);
            }}
          >
            <img src="assets/icons/delete.png" alt="" />
          </button>
        </Space>
      ),
    },
  ];

  const handleDelete = (record) => {
    props.setJobs((prev) => {
      return prev.filter((job) => job.key !== record.key);
    });
  };
  function handleDeleteCourse(record) {
    var options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(props.jobApi + "/" + record.key, options)
      .then((response) => {
        response.json();
      })
      .then(function () {});
  }
  const showDeleteConfirm = (record) => {
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      onOk() {
        // handleDelete(record);
        handleDeleteCourse(record);
        props.setDeleteJob(!props.deleteJob);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <div>
      <Table columns={columns} dataSource={props.jobs} />
      <Modal
        title="EDIT TASK"
        open={isEditModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="mb-[12px]">
          <p>Task name</p>
          <input
            className="border rounded-[5px] w-full px-[15px] py-[8px]"
            placeholder="Task name"
            type="text"
          />
        </div>
        <div className="mb-[12px]">
          <p>Deadline</p>
          <Space style={{ width: "100%" }} direction="vertical">
            <DatePicker onChange={onChange} />
          </Space>
        </div>
        <div>
          <p>Status</p>
          <Form.Item>
            <Select>
              <Select.Option value="done">Done</Select.Option>
              <Select.Option value="doing">Doing</Select.Option>
              <Select.Option value="fail">Fail</Select.Option>
            </Select>
          </Form.Item>
        </div>
      </Modal>
    </div>
  );
};

export default TableList;
