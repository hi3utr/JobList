import { Space, Modal, Form, Select, DatePicker, Button } from "antd";
import React from "react";

export const TaskModal = (props) => {
  function createJob(data) {
    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("https://630eca933792563418817e08.mockapi.io/products", options).then(
      function (response) {
        props.handleOk();
        return response.json();
      }
    );
  }

  function updateJob(data) {
    var options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(
      "https://630eca933792563418817e08.mockapi.io/products" +
        "/" +
        props.jobId,
      options
    ).then(function (response) {
      props.handleOk();
      return response.json();
    });
  }

  return (
    <div>
      <Modal
        title={props.isCreateModal ? "Add Task" : "Edit Task"}
        open={props.isEditModalOpen}
        onCancel={props.handleCancel}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        destroyOnClose
      >
        <Form
          initialValues={props.task}
          onFinish={props.isCreateModal ? createJob : updateJob}
        >
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
                <Select.Option value={0}>Done</Select.Option>
                <Select.Option value={1}>Doing</Select.Option>
                <Select.Option value={2}>Fail</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className="flex justify-end gap-4">
            <Button type="default" onClick={props.handleCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
