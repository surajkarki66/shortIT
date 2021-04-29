import React from "react";
import { Form, Input } from "antd";

type Props = {
  editError: string;
  onFinish: (value: any) => void;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ProfileForm: React.FC<Props> = (props) => {
  const { editError, onFinish, onChangeHandler } = props;

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

  return (
    <Form
      style={{
        minWidth: "300px",
        fontWeight: "bold",
      }}
      {...formItemLayout}
      name="register"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      {editError !== "" && <h4 style={{ color: "red" }}>{editError}</h4>}
      <Form.Item
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
          name="firstName"
          onChange={(event) => onChangeHandler(event)}
          placeholder="First Name"
        />
      </Form.Item>
      <Form.Item
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
          name="lastName"
          onChange={(event) => onChangeHandler(event)}
          placeholder="Last Name"
        />
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
