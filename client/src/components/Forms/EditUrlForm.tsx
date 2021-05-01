import React from "react";
import { Form, Input, Button, FormInstance } from "antd";

type Props = {
  form: FormInstance<any>;
  editError: string;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  onClickSubmitBtn: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const EditUrlForm: React.FC<Props> = (props) => {
  const { editError, form, setTitle, title, loading, onClickSubmitBtn } = props;
  return (
    <Form
      form={form}
      style={{
        minWidth: "405px",
        fontWeight: "bold",
      }}
      name="edit_url"
      className="edit-form"
      initialValues={{ remember: true }}
    >
      {editError !== "" && <h4 style={{ color: "red" }}>{editError}</h4>}
      <Form.Item
        name="title"
        rules={[
          {
            required: true,
            message: "Please input your title",
          },
        ]}
      >
        <Input
          name="title"
          placeholder="Enter the title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </Form.Item>
      <Form.Item>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          className="edit-url-button"
          onClick={onClickSubmitBtn}
        >
          {loading ? "" : "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditUrlForm;
