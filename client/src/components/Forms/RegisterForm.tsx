import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";

interface Props {
  loading: boolean;
  registerError: string;
  onFinish: (value: any) => void;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RegisterForm: React.FC<Props> = (props) => {
  const { loading, registerError, onFinish, onChangeHandler } = props;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <Form
      style={{
        minWidth: "405px",
        fontWeight: "bold",
      }}
      {...formItemLayout}
      name="register"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      {registerError !== "" && (
        <h4 style={{ color: "red" }}>{registerError}</h4>
      )}
      <Form.Item
        label="First-Name"
        name="firstName"
        rules={[
          { required: true, message: "Please input your First Name" },
          { min: 2, message: "First Name should be more than 1 character" },
          {
            max: 32,
            message: "First Name should be less than 32 character",
          },
        ]}
      >
        <Input name="firstName" onChange={(event) => onChangeHandler(event)} />
      </Form.Item>
      <Form.Item
        label="Last-Name"
        name="lastName"
        rules={[
          { required: true, message: "Please input your Last Name" },
          { min: 2, message: "Last Name should be more than 1 character" },
          {
            max: 32,
            message: "Last Name should be less than 32 character",
          },
        ]}
      >
        <Input name="lastName" onChange={(event) => onChangeHandler(event)} />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
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
        <Input name="email" onChange={(event) => onChangeHandler(event)} />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          { min: 6, message: "Password should be more than 5 character" },
          {
            pattern: /[A-Z]/,
            message: "Password must contain an uppercase",
          },
          { pattern: /[0-9]/, message: "Password must contain a number" },
        ]}
        hasFeedback
      >
        <Input.Password
          name="password"
          onChange={(event) => onChangeHandler(event)}
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("The Passwords doesn't match!"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="/agreement">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          style={{ marginTop: "20px" }}
        >
          {loading ? "" : "Register"}
        </Button>
        Or <Link to="/login">Login now!</Link>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
