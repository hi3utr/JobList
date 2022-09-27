import { Space, Table, Tag, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useState, useContext } from "react";
import * as dayjs from "dayjs";
import moment from "moment";
import { TaskModal } from "./TaskModal";
import { SearchContext } from "./Provider/SearchProvider";

const TableList = (props) => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
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
  const onChange = (date, dateString) => {};
  const showEditModal = (record) => {
    setTask({
      ...record,
      deadline: moment(record.deadline),
      created: moment(record.created),
      status: record.status % 3,
    });
    setIsEditModalOpen(true);
  };

  const handleOk = () => {
    setIsEditModalOpen(false);
    props.fetchApi(searchTerm);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
  };
  const { confirm } = Modal;

  const getStatus = (status) => {
    const tag = tags[status % 3];

    if (tag)
      return (
        <Tag color={tag.color} key={tag}>
          {tag.value.toUpperCase()}
        </Tag>
      );

    return;
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
        jobId={task.key}
      />
    </div>
  );
};

export default TableList;
