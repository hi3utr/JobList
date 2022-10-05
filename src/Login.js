import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./Provider/AuthProvider";

const Login = () => {
  const { setToken } = useContext(AuthContext);
  const onFinish = (values) => {
    const loginApi = process.env.REACT_APP_API_URL + "/auth/local";
    axios
      .post(loginApi, {
        identifier: values.identifier,
        password: values.password,
      })
      .then((response) => {
        const { jwt } = response.data;
        localStorage.setItem("token", jwt);
        setToken(jwt);
      });
  };

  return (
    <div
      style={{
        background:
          "url('https://img.freepik.com/free-vector/white-abstract-background-design_23-2148825582.jpg?w=996&t=st=1664858906~exp=1664859506~hmac=e6c35fd5426cac94358be6f2e4012e85beed75932850fc744190441d1695387d')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="flex justify-center h-[100vh] items-center"
    >
      <Form
        name="normal_login"
        className="login-form flex flex-col w-[20%]"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="identifier"
          rules={[
            {
              required: true,
              message: "Please input your Identifier!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Identifer"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          {/* <div>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </div> */}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <div>
            Or <Link to="/register">register now!</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
