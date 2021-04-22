import React from "react";
import { Button, Input, Form, FormInstance } from "antd";

type PropsType = {
  form: FormInstance<any>;
  formSubmitHandler: (value: any) => void;
  loading: boolean;
  urlError: string;
};

const UrlForm: React.FC<PropsType> = (props) => {
  const { form, formSubmitHandler, loading, urlError } = props;
  return (
    <div className="url-form">
      <h2 style={{ textTransform: "uppercase" }}>
        Short your freaking long URL
      </h2>
      {urlError !== "" && <h4 style={{ color: "red" }}>{urlError}</h4>}
      <Form form={form} onFinish={(value) => formSubmitHandler(value)}>
        <Form.Item
          name="Url"
          rules={[
            {
              required: true,
              message: "Please input your freaky long url!",
            },
          ]}
        >
          <Input
            style={{
              width: "50%",
            }}
            type="text"
            placeholder="Enter the freaking long url"
            size="large"
            allowClear
            id="urlInput"
          />
        </Form.Item>
        <div style={{ marginTop: "20px" }}>
          <Button
            size="large"
            type="primary"
            loading={loading}
            htmlType="submit"
          >
            {loading ? "" : "Shorten"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UrlForm;
