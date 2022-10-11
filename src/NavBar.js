import React, { useState, useContext, useRef } from "react";
import {
  Button,
  Modal,
  DatePicker,
  Space,
  Select,
  Form,
  Dropdown,
  Menu,
  message,
} from "antd";
import { TaskModal } from "./TaskModal";
import moment from "moment";
import { SearchContext } from "./Provider/SearchProvider";
import { AuthContext } from "./Provider/AuthProvider";
import { debounce } from "lodash";
import {
  BookOutlined,
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import MenuItem from "antd/lib/menu/MenuItem";
import { useNavigate } from "react-router-dom";

export const NavBar = (props) => {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    message.info("Logged out");
    setToken("");
    localStorage.removeItem("token");
  };

  const menu = (
    <Menu
      onClick={({ key }) => {
        if (key === "2") {
          handleLogout();
        } else {
          navigate("/profiles");
        }
      }}
      items={[
        {
          label: "Profile",
          key: "1",
          icon: <UserOutlined />,
        },
        {
          label: "Logout",
          key: "2",
          icon: <LogoutOutlined />,
        },
      ]}
      style={{ borderRadius: "10px", overflow: "hidden" }}
    />
  );
  const [isCreateModal, setIsCreateModal] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [task, setTask] = useState({
    title: "",
    start_date: moment(),
    end_date: "",
    status: "",
  });
  const inputSearch = useRef();

  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const onChange = (date, dateString) => {};
  const showEditModal = (record) => {
    setTask({
      ...record,
      end_date: "",
      start_date: moment(),
      status: "",
    });
    setIsEditModalOpen(true);
  };

  const handleOk = () => {
    setIsEditModalOpen(false);
    inputSearch.current.value = "";
    props.fetchApi();
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
  };
  const { confirm } = Modal;

  return (
    <div className="flex justify-between px-[26px] py-[24px] items-center">
      <Link to="/">
        <button className="text-[#5E5873] text-lg font-medium">
          Task List
        </button>
      </Link>
      <div className="flex items-center">
        <div className="relative">
          <input
            className="border rounded-[5px] mr-[27px] py-[8px] pl-[12px] text-[12px] pr-[30px]"
            ref={inputSearch}
            placeholder="Search task"
            onChange={debounce((e) => {
              setSearchTerm(e.target.value.toLocaleLowerCase());
            }, 500)}
          />
          <img
            className="absolute top-[30%] right-[18%]"
            src="assets/icons/SearchIcon.png"
            alt=""
          />
        </div>
        <button
          type="submit"
          onClick={showEditModal}
          className="bg-[#3C6D73] rounded-[5px] px-[30px] py-[8px] text-white text-[12px] font-medium"
        >
          + Add Task
        </button>
        <Link to="/bookmarks">
          <button className="text-[25px] flex ml-[27px]">
            <BookOutlined />
          </button>
        </Link>
        <Dropdown overlay={menu} placement="bottomRight">
          <div className="flex text-[25px] ml-[22px] cursor-pointer">
            <UserOutlined />
          </div>
        </Dropdown>
        <TaskModal
          isCreateModal={isCreateModal}
          isEditModalOpen={isEditModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          task={task}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
