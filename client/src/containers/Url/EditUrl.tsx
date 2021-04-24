import { Modal, Input, Form, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";

type PropsType = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  urlId: string;
  visible: boolean;
  loading: boolean;
  handleEditOk: (_id: string) => void;
  handleEditCancel: () => void;
};

const EditUrl: React.FC<PropsType> = (props) => {
  const {
    urlId,
    visible,
    loading,
    handleEditOk,
    handleEditCancel,
    title,
    setTitle,
  } = props;
  const [form] = useForm();

  return (
    <>
      <Modal
        title="Edit Url"
        visible={visible}
        footer={[
          <Button key="back" onClick={handleEditCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => handleEditOk(urlId)}
            disabled={!title ? true : false}
          >
            Submit
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item name="Title">
            <Input
              style={{
                width: "50%",
              }}
              type="text"
              placeholder="Enter the title"
              size="large"
              allowClear
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditUrl;
