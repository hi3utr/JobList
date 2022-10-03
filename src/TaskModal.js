import { Space, Modal, Form, Select, DatePicker, Button } from "antd";
import React, { useState, useMemo, useCallback } from "react";

export const TaskModal = (props) => {
  const [onSave, setOnSave] = useState(false);
  function createJob(data) {
    setOnSave(true);
    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("https://630eca933792563418817e08.mockapi.io/products", options).then(
      function (response) {
        setOnSave(false);
        props.handleOk();
        return response.json();
      }
    );
  }

  function updateJob(data) {
    const jobId = props.jobId;
    setOnSave(true);
    var options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(
      "https://630eca933792563418817e08.mockapi.io/products" + "/" + jobId,
      options
    ).then(function (response) {
      setOnSave(false);
      props.handleOk();
      return response.json();
    });
  }

  const title = useMemo(() => {
    if (props.isCreateModal) return "Add Task";
    return "Edit Task";
  }, [props.isCreateModal]);

  const handleFinish = useCallback(
    (values) => {
      if (props.isCreateModal) return createJob(values);
      return updateJob(values);
    },
    [props.isCreateModal]
  );
  return (
    <div>
      <Modal
        title={title}
        open={props.isEditModalOpen}
        onCancel={props.handleCancel}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        destroyOnClose
      >
        <Form initialValues={props.task} onFinish={handleFinish}>
          <div className="mb-[12px]">
            <p>Task name</p>
            <Form.Item
              name="name"
              rules={[
                { required: true },
                { type: "string", warningOnly: true },
              ]}
            >
              <input
                disabled={onSave ? true : false}
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
              <Form.Item
                name="deadline"
                rules={[
                  { required: true },
                  { type: "date", warningOnly: true },
                ]}
              >
                <DatePicker
                  disabled={onSave ? true : false}
                  onChange={props.onChange}
                />
              </Form.Item>
            </Space>
          </div>
          <div>
            <p>Status</p>
            <Form.Item name="status" rules={[{ required: true }]}>
              <Select disabled={onSave ? true : false}>
                <Select.Option value={0}>Done</Select.Option>
                <Select.Option value={1}>Doing</Select.Option>
                <Select.Option value={2}>Fail</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className="flex justify-end gap-4">
            <Button
              disabled={onSave ? true : false}
              type="default"
              onClick={props.handleCancel}
            >
              Cancel
            </Button>
            <Button
              disabled={onSave ? true : false}
              type="primary"
              htmlType="submit"
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
