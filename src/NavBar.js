import React, { useState, useContext, useRef } from "react";
import { Button, Modal, DatePicker, Space, Select, Form } from "antd";
import { TaskModal } from "./TaskModal";
import moment from "moment";
import { SearchContext } from "./Provider/SearchProvider";
import { debounce } from "lodash";

export const NavBar = (props) => {
  const [isCreateModal, setIsCreateModal] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [task, setTask] = useState({
    name: "",
    created: "",
    deadline: "",
    status: "",
  });
  const inputSearch = useRef();

  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const showEditModal = (record) => {
    setTask({
      ...record,
      deadline: "",
      created: moment(),
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
      <div className="text-[#5E5873] font-medium">Task List</div>
      <div className="flex">
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
