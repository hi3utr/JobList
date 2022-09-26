import { Space, Table, Tag, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import * as dayjs from "dayjs";
import moment from "moment";
import { TaskModal } from "./TaskModal";

const TableList = (props) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [task, setTask] = useState({
    name: "",
    created: "",
    deadline: "",
    status: "",
  });
  const tags = [
    {
      value: "done",
      color: "green",
    },
    {
      value: "doing",
      color: "orange",
    },
    {
      value: "fail",
      color: "volcano",
    },
  ];
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const showEditModal = (record) => {
    setTask({
      ...record,
      deadline: moment(record.deadline),
      created: moment(record.created),
      status: tags[record.status % 3].value,
    });
    setIsEditModalOpen(true);
  };

  const handleOk = () => {
    setIsEditModalOpen(false);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
  };
  const { confirm } = Modal;

  const getStatus = (status) => {
    const tag = tags[status % 3];

    return (
      <Tag color={tag.color} key={tag}>
        {tag.value.toUpperCase()}
      </Tag>
    );
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
      render: (status) => <>{getStatus(status)}</>,
    },
    {
      title: "ACTION",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <button onClick={() => showEditModal(record)}>
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

  function handleDeleteJob(record) {
    var options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(props.jobApi + "/" + record.key, options)
      .then((response) => {
        response.json();
        props.fetchApi();
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
        handleDeleteJob(record);
      },
      onCancel() {},
    });
  };
  return (
    <div>
      <Table columns={columns} dataSource={props.jobs} />
      <TaskModal
        jobApi={props.jobApi}
        isEditModalOpen={isEditModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        task={task}
        onChange={onChange}
      />
    </div>
  );
};

export default TableList;
