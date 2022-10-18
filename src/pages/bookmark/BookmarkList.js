import { Space, Table, Tag, Modal } from "antd";
import {
  ExclamationCircleOutlined,
  BookOutlined,
  BookFilled,
  EditOutlined,
  DeleteOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import React, { useState, useContext } from "react";
import * as dayjs from "dayjs";
import moment from "moment";
import { TaskModal } from "../../components/TaskModal";
import { deleteTask, updateBookmarkList } from "../../services/TaskService";
import { BookmarkFilter } from "../bookmark/BookmarkFilter";
import { useLocation, useNavigate } from "react-router-dom";
import { useBookmarkList } from "../../hooks/useBookmarkList";
import { SearchBookmarkContext } from "../../Provider/bookmarkProvider";
const BookmarkList = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchTerm, sort, setSort, page, setPage, pageSize } = useContext(
    SearchBookmarkContext
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [jobId, setJobId] = useState(0);

  const [task, setTask] = useState({
    title: "",
    start_date: "",
    end_date: "",
    status: "",
    id: "",
  });

  const { loading, jobs, fetchApi, pagination, setJobs } = useBookmarkList();

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

  const sortData = (sortColumn) => {
    const sortParams = new URLSearchParams(location.search);
    const [column, sortDir] = sort.split(":");

    if (column === sortColumn) {
      if (sortDir === "asc") {
        setSort(`${sortColumn}:desc`);
        sortParams.set("sort", `${sortColumn}:desc`);
      } else {
        setSort(`${sortColumn}:asc`);
        sortParams.set("sort", `${sortColumn}:asc`);
      }
    } else {
      setSort(`${sortColumn}:asc`);
      sortParams.set("sort", `${sortColumn}:asc`);
    }
    navigate({
      pathname: location.pathname,
      search: sortParams.toString(),
    });
  };

  const columns = [
    {
      title: () => {
        return (
          <div className="cursor-pointer" onClick={() => sortData("title")}>
            TITLE
            {sort && sort.includes("title") && (
              <div className="float-right flex items-center h-[22px]">
                {sort.includes("asc") ? (
                  <SortAscendingOutlined />
                ) : (
                  <SortDescendingOutlined />
                )}
              </div>
            )}
          </div>
        );
      },
      dataIndex: "title",
      key: "name",
    },
    {
      title: () => {
        return (
          <div
            className="cursor-pointer"
            onClick={() => {
              sortData("start_date");
            }}
          >
            CREATED
            {sort && sort.includes("start_date") && (
              <div className="float-right flex items-center h-[22px]">
                {sort.includes("asc") ? (
                  <SortAscendingOutlined />
                ) : (
                  <SortDescendingOutlined />
                )}
              </div>
            )}
          </div>
        );
      },
      dataIndex: "start_date",
      key: "created",
      render: (text) => <p>{dayjs(text).format("DD/MM/YYYY")}</p>,
    },
    {
      title: () => {
        return (
          <div className="cursor-pointer" onClick={() => sortData("end_date")}>
            DEADLINE
            {sort && sort.includes("end_date") && (
              <div className="float-right flex items-center h-[22px]">
                {sort.includes("asc") ? (
                  <SortAscendingOutlined />
                ) : (
                  <SortDescendingOutlined />
                )}
              </div>
            )}
          </div>
        );
      },
      dataIndex: "end_date",
      key: "deadline",
      render: (text) => <p>{dayjs(text).format("DD/MM/YYYY")}</p>,
    },
    {
      title: () => {
        return (
          <div className="cursor-pointer" onClick={() => sortData("status")}>
            STATUS
            {sort && sort.includes("status") && (
              <div className="float-right flex items-center h-[22px]">
                {sort.includes("asc") ? (
                  <SortAscendingOutlined />
                ) : (
                  <SortDescendingOutlined />
                )}
              </div>
            )}
          </div>
        );
      },
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

  const handleDeleteJob = async (record) => {
    await deleteTask(record);
    await fetchApi(searchTerm);
  };
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

  const updateBookmark = async (record) => {
    const response = await updateBookmarkList(record);
    const index = jobs.findIndex((job) => job.id === record.id);

    if (index > -1) {
      props.setJobs((prev) => {
        const temp = [...prev];
        temp.splice(index, 1);
        return temp;
      });
    }

    return response.json();
  };

  return (
    <div>
      <BookmarkFilter />
      <Table
        columns={columns}
        dataSource={jobs}
        loading={loading}
        style={{ borderRadius: "20px", overflow: "hidden" }}
        pagination={{
          position: ["bottomCenter"],
          pageSize: pageSize,
          current: page,
          total: pagination.total,
          onChange: (pageNumber) => setPage(pageNumber),
        }}
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

export default BookmarkList;
