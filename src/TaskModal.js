import { Space, Modal, Form, Select, DatePicker } from "antd";
import React from "react";

export const TaskModal = (props) => {
  return (
    <div>
      <Modal
        title={props.isCreateModal ? "Add Task" : "Edit Task"}
        open={props.isEditModalOpen}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
      >
        <Form initialValues={props.task}>
          <div className="mb-[12px]">
            <p>Task name</p>
            <Form.Item name="name">
              <input
                className="border rounded-[5px] w-full px-[15px] py-[8px]"
                placeholder="Task name"
                type="text"
              />
            </Form.Item>
          </div>
          <div className="mb-[12px]">
            <p>Created</p>
            <Space style={{ width: "100%" }} direction="vertical">
              <Form.Item name="created">
                <DatePicker disabled onChange={props.onChange} />
              </Form.Item>
            </Space>
          </div>
          <div className="mb-[12px]">
            <p>Deadline</p>
            <Space style={{ width: "100%" }} direction="vertical">
              <Form.Item name="deadline">
                <DatePicker onChange={props.onChange} />
              </Form.Item>
            </Space>
          </div>
          <div>
            <p>Status</p>
            <Form.Item name="status">
              <Select>
                <Select.Option value="done">Done</Select.Option>
                <Select.Option value="doing">Doing</Select.Option>
                <Select.Option value="fail">Fail</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
