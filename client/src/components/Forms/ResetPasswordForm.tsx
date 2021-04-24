import React from "react";
import { Form, Input, Button, FormInstance } from "antd";

type Props = {
  password: string;
  form: FormInstance<any>;
  loading: boolean;
  resetError: string;
  onFinish: (value: any) => void;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ResetPasswordForm: React.FC<Props> = (props) => {
  const {
    loading,
    resetError,
    onFinish,
    onChangeHandler,
    form,
    password,
  } = props;
  return (
    <Form
      form={form}
      style={{
        minWidth: "405px",
        fontWeight: "bold",
      }}
      name="reset_password"
      className="reset-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      {resetError !== "" && <h4 style={{ color: "red" }}>{resetError}</h4>}
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
          value={password}
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm"
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

      <Form.Item>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          className="reset-password-button"
        >
          {loading ? "" : "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResetPasswordForm;
