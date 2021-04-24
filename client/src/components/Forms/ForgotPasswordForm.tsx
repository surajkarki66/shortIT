import React from "react";
import { Form, Input, Button, FormInstance } from "antd";
import { UserOutlined } from "@ant-design/icons";

type Props = {
  email: string;
  form: FormInstance<any>;
  loading: boolean;
  forgotError: string;
  onFinish: (value: any) => void;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ForgotPasswordForm: React.FC<Props> = (props) => {
  const {
    loading,
    forgotError,
    onFinish,
    onChangeHandler,
    form,
    email,
  } = props;
  return (
    <Form
      form={form}
      style={{
        minWidth: "405px",
        fontWeight: "bold",
      }}
      name="forgot_password"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      {forgotError !== "" && <h4 style={{ color: "red" }}>{forgotError}</h4>}
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
          value={email}
        />
      </Form.Item>

      <Form.Item>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          className="forgot-password-button"
        >
          {loading ? "" : "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotPasswordForm;
