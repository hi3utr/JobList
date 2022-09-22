import React, { useState } from "react";
import { Button, Modal, DatePicker, Space, Select, Form } from "antd";

export const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex justify-between px-[26px] py-[24px] items-center">
      <div className="text-[#5E5873] font-medium">Task List</div>
      <div className="flex">
        <div className="relative">
          <input
            className="border rounded-[5px] mr-[27px] py-[8px] pl-[12px] text-[12px] pr-[30px]"
            placeholder="Search task"
          />
          <img
            className="absolute top-[30%] right-[18%]"
            src="assets/icons/SearchIcon.png"
            alt=""
          />
        </div>
        <button
          type="submit"
          onClick={showModal}
          className="bg-[#3C6D73] rounded-[5px] px-[30px] py-[8px] text-white text-[12px] font-medium"
        >
          + Add Task
        </button>
        <Modal
          title="ADD TASK"
          open={isModalOpen}
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
    </div>
  );
};
