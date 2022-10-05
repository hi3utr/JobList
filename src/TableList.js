import { Space, Table, Tag, Modal } from "antd";
import {
  ExclamationCircleOutlined,
  BookOutlined,
  BookFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import React, { useState, useContext } from "react";
import * as dayjs from "dayjs";
import moment from "moment";
import { TaskModal } from "./TaskModal";
import { SearchContext } from "./Provider/SearchProvider";
import { AuthContext } from "./Provider/AuthProvider";

const TableList = (props) => {
  const { token } = useContext(AuthContext);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [jobId, setJobId] = useState(0);
  const [task, setTask] = useState({
    title: "",
    start_date: "",
    end_date: "",
    status: "",
    id: "",
  });
  const tags = [
    {
      value: "to do",
      color: "gray",
    },
    {
      value: "done",
      color: "green",
    },
    {
      value: "in progress",
      color: "orange",
    },
    {
      value: "failed",
      color: "volcano",
    },
  ];
  const onChange = (date, dateString) => {};
  const showEditModal = (record) => {
    setJobId(record.id);
    setTask({
      ...record,
      end_date: moment(record.end_date),
      start_date: moment(record.start_date),
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
    const index = tags.findIndex((tag) => tag.value === status);

    if (index > -1)
      return (
        <Tag color={tags[index].color} key={index}>
          {status.toUpperCase()}
        </Tag>
      );

    return;
  };

  const columns = [
    {
      title: "NAME",
      dataIndex: "title",
      key: "name",
    },
    {
      title: "CREATED",
      dataIndex: "start_date",
      key: "created",
      render: (text) => <p>{dayjs(text).format("DD/MM/YYYY")}</p>,
    },
    {
      title: "DEADLINE",
      dataIndex: "end_date",
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
        <Space size="middle" className="text-[20px]">
          <button className="flex" onClick={() => showEditModal(record)}>
            <EditOutlined />
          </button>

          <button
            className="flex"
            onClick={() => {
              showDeleteConfirm(record);
            }}
          >
            <DeleteOutlined />
          </button>
          <button
            className="flex"
            onClick={() => {
              updateBookmark(record);
            }}
          >
            {!record.bookmark ? <BookOutlined /> : <BookFilled />}
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
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(props.jobApi + "/" + record.id, options)
      .then((response) => {
        response.json();
        props.fetchApi();
      })
      .then(function () {});
  }
  const showDeleteConfirm = (record) => {
    confirm({
      title: "Are you sure to delete this task?",
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

  const updateBookmark = (record) => {
    var options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: { bookmark: !record.bookmark } }),
    };
    fetch(props.jobApi + "/" + record.id, options).then(function (response) {
      const index = props.jobs.findIndex((job) => job.id === record.id);

      if (index > -1) {
        props.setJobs((prev) => {
          const newRecord = {
            ...record,
            bookmark: !record.bookmark,
          };
          const temp = [...prev];
          temp.splice(index, 1, newRecord);
          return temp;
        });
      }

      return response.json();
    });
  };
  return (
    <div>
      <Table
        columns={columns}
        dataSource={props.jobs}
        loading={props.loading}
      />
      {isEditModalOpen && (
        <TaskModal
          jobApi={props.jobApi}
          isEditModalOpen={isEditModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          task={task}
          onChange={onChange}
          jobId={jobId}
        />
      )}
    </div>
  );
};

export default TableList;
