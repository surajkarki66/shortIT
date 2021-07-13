import React from "react";
import { Form, Input, Button, FormInstance } from "antd";

type Props = {
  loading: boolean;
  changeError: string;
  form: FormInstance<any>;
  onFinish: (value: any) => void;
};

const ChangeEmailForm: React.FC<Props> = (props) => {
  const { loading, changeError, onFinish, form } = props;
  return (
    <Form
      form={form}
      style={{
        minWidth: "405px",
        fontWeight: "bold",
      }}
      name="change_email"
      className="change-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      {changeError !== "" && <h4 style={{ color: "red" }}>{changeError}</h4>}
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
        <Input name="email" placeholder="Enter an Email" />
      </Form.Item>
      <Form.Item>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          className="change-email-button"
        >
          {loading ? "" : "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangeEmailForm;
