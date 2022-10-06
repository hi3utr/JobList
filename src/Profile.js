import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, message } from "antd";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./Provider/AuthProvider";
import { NavBar } from "./NavBar";
import { isEmpty } from "lodash";

export const Profile = () => {
  var jobApi = process.env.REACT_APP_API_URL + "/users/me";
  const { setToken } = useContext(AuthContext);
  const [users, setUsers] = useState({});
  const { token } = useContext(AuthContext);
  const changePassword = (data) => {
    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword: data.old_password,
        password: data.new_password,
        passwordConfirmation: data.confirm_password,
      }),
    };
    fetch(
      process.env.REACT_APP_API_URL + "/auth/change-password",
      options
    ).then(function (response) {
      return response.json();
    });
  };
  const handleFinish = (data) => {
    changePassword(data);
    message.info("Change password successfully");
    message.info("Logged out");
    setToken("");
    localStorage.removeItem("token");
  };
  const fetchApi = () => {
    axios
      .get(jobApi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      });
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div
      style={{
        background:
          "url('https://img.freepik.com/free-vector/white-abstract-background-design_23-2148825582.jpg?w=996&t=st=1664858906~exp=1664859506~hmac=e6c35fd5426cac94358be6f2e4012e85beed75932850fc744190441d1695387d')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="h-[100vh]"
    >
      <NavBar />

      <div className="flex flex-col items-center gap-[20px]">
        {!isEmpty(users) && (
          <Card
            title="User Info"
            style={{
              width: "50vw",
            }}
          >
            <Form
              name="normal_login"
              className="login-form flex flex-col"
              initialValues={users}
            >
              <Form.Item name="username">
                <Input
                  readOnly
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item name="email">
                <Input
                  readOnly
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
            </Form>
          </Card>
        )}

        <Card
          title="Change Password"
          style={{
            width: "50vw",
          }}
        >
          <Form
            name="change_password"
            className="login-form flex flex-col"
            initialValues={{}}
            onFinish={handleFinish}
          >
            <Form.Item
              name="old_password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                prefix={<KeyOutlined className="site-form-item-icon" />}
                placeholder="Old password"
              />
            </Form.Item>
            <Form.Item
              name="new_password"
              rules={[
                {
                  min: 6,
                  required: true,
                  message: "Please input your new password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<KeyOutlined className="site-form-item-icon" />}
                placeholder="New password"
              />
            </Form.Item>
            <Form.Item
              name="confirm_password"
              dependencies={["new_password"]}
              hasFeedback
              rules={[
                {
                  min: 6,
                  required: true,
                  message: "Please confirm your new password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("new_password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<KeyOutlined className="site-form-item-icon" />}
                placeholder="Conirm your password"
              />
            </Form.Item>
            <Button htmlType="submit">Change Password</Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};
