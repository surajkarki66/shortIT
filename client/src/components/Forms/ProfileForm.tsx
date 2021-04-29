import React from "react";
import { Form, Input, Button } from "antd";

import { UserType } from "../../pages/Home";

type Props = {
  loading: boolean;
  editError: string;
  user: UserType;
  onFinish: (value: any) => void;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ProfileForm: React.FC<Props> = (props) => {
  const { loading, editError, onFinish, onChangeHandler, user } = props;

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
        marginTop: "50px",
      }}
      {...formItemLayout}
      name="register"
      initialValues={{
        remember: true,
        firstName: user.firstName,
        lastName: user.lastName,
      }}
      onFinish={onFinish}
    >
      {editError !== "" && <h4 style={{ color: "red" }}>{editError}</h4>}
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

      <Form.Item {...tailFormItemLayout}>
        <Button
          disabled={user.status === "inactive" ? true : false}
          type="primary"
          htmlType="submit"
          loading={loading}
          style={{ marginTop: "20px" }}
        >
          {loading ? "" : "Edit"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
