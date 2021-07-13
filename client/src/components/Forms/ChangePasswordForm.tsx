import React from "react";
import { Form, Input, Button, FormInstance, Checkbox } from "antd";

type Props = {
  form: FormInstance<any>;
  loading: boolean;
  changeError: string;
  onFinish: (value: any) => void;
};

const ChangePasswordForm: React.FC<Props> = (props) => {
  const { loading, changeError, onFinish, form } = props;
  return (
    <Form
      form={form}
      style={{
        minWidth: "405px",
        fontWeight: "bold",
      }}
      name="change_password"
      className="change-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      {changeError !== "" && <h4 style={{ color: "red" }}>{changeError}</h4>}
      <Form.Item
        name="oldPassword"
        rules={[
          {
            required: true,
            message: "Please input your old password!",
          },
          { min: 6, message: "Old Password should be more than 5 character" },
          {
            pattern: /[A-Z]/,
            message: "Old Password must contain an uppercase",
          },
          { pattern: /[0-9]/, message: "Old Password must contain a number" },
        ]}
        hasFeedback
      >
        <Input.Password name="oldPassword" placeholder="Enter Old Password" />
      </Form.Item>
      <Form.Item
        name="newPassword"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          { min: 6, message: "New Password should be more than 5 character" },
          {
            pattern: /[A-Z]/,
            message: "New Password must contain an uppercase",
          },
          { pattern: /[0-9]/, message: "New Password must contain a number" },
        ]}
        hasFeedback
      >
        <Input.Password name="newPassword" placeholder="Enter New Password" />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={["newPassword"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("The Passwords doesn't match!"));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Enter Confirm Password" />
      </Form.Item>
      <Form.Item name="loggedIn" valuePropName="checked">
        <Checkbox name="loggedIn">Logged In</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          className="change-password-button"
        >
          {loading ? "" : "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePasswordForm;
