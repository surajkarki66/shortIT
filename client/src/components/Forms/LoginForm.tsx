import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

interface Props {
  loading: boolean;
  loginError: string;
  onFinish: (value: any) => void;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginForm: React.FC<Props> = (props) => {
  const { loading, loginError, onFinish, onChangeHandler } = props;
  return (
    <Form
      style={{
        minWidth: "405px",
        fontWeight: "bold",
      }}
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      {loginError !== "" && <h4 style={{ color: "red" }}>{loginError}</h4>}
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input
          name="email"
          onChange={(event) => onChangeHandler(event)}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input
          onChange={(event) => onChangeHandler(event)}
          name="password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Link to="/forgotPassword">Forgot password</Link>
      </Form.Item>

      <Form.Item>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          {loading ? "" : "Log in"}
        </Button>
        Or <Link to="/register">register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
