import React, { useContext } from "react";
import { Space, Modal, Form, Select, DatePicker, Button, Card } from "antd";
import { SearchBookmarkContext } from "../../Provider/bookmarkProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const BookmarkFilter = () => {
  const { setFilter, filter } = useContext(SearchBookmarkContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const handleFinish = (values) => {
    setFilter(values);
    const replace = ["/", "/bookmarks"].includes(location.pathname);
    const filterParams = new URLSearchParams(location.search);
    filterParams.set("filter", JSON.stringify(values));
    navigate(
      {
        pathname: replace ? location.pathname : "/",
        search: filterParams.toString(),
      },
      {
        replace,
      }
    );
  };

  const handleReset = () => {
    setFilter({});
    form.resetFields();
    const replace = ["/", "/bookmarks"].includes(location.pathname);

    const filterParams = new URLSearchParams(location.search);
    filterParams.set("filter", JSON.stringify({}));
    navigate(
      {
        pathname: replace ? location.pathname : "/",
        search: filterParams.toString(),
      },
      {
        replace,
      }
    );
  };
  return (
    <Card>
      <div>
        <p>Status Filter</p>
        <Form initialValues={filter} form={form} onFinish={handleFinish}>
          <Form.Item name={"status"}>
            <Select mode="multiple">
              <Select.Option value={"to do"}>To Do</Select.Option>
              <Select.Option value={"in progress"}>In Progress</Select.Option>
              <Select.Option value={"done"}>Done</Select.Option>
              <Select.Option value={"failed"}>Fail</Select.Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            OK
          </Button>
          <Button onClick={handleReset}>Clear</Button>
        </Form>
      </div>
    </Card>
  );
};
