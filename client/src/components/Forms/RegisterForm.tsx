import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";

import { IUserRegisterInput } from "../../pages/Register";

interface Props {
  userInputData: IUserRegisterInput;
  setUserInputData: React.Dispatch<React.SetStateAction<IUserRegisterInput>>;
  loading: boolean;
  registerError: string;
  onFinish: (value: any) => void;
}

const RegisterForm: React.FC<Props> = (props) => {
  const {
    userInputData,
    setUserInputData,
    loading,
    registerError,
    onFinish,
  } = props;
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
    <React.Fragment>
      {registerError !== "" && (
        <h4 style={{ color: "red" }}>{registerError}</h4>
      )}

      <Form
        {...formItemLayout}
        name="register"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
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
          <Input
            onChange={(event) =>
              setUserInputData({
                ...userInputData,
                firstName: event.target.value,
              })
            }
          />
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
          <Input
            onChange={(event) =>
              setUserInputData({
                ...userInputData,
                lastName: event.target.value,
              })
            }
          />
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
          <Input
            onChange={(event) =>
              setUserInputData({
                ...userInputData,
                email: event.target.value,
              })
            }
          />
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
            onChange={(event) =>
              setUserInputData({
                ...userInputData,
                password: event.target.value,
              })
            }
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
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
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
          <Button type="primary" htmlType="submit" loading={loading}>
            {loading ? "" : "Register"}
          </Button>
          Or <Link to="/login">Login now!</Link>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

export default RegisterForm;
