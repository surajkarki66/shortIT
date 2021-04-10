import React from "react";
import { Button, Input, Form } from "antd";

interface Props {
  loading: boolean;
  customError: string;
  formSubmitHandler: (value: any) => void;
}

const urlForm: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
      <div className="search-bar">
        <h2 style={{ textTransform: "uppercase" }}>
          Short your freaking long URL
        </h2>
        {props.customError !== undefined ? (
          <h4 style={{ color: "red" }}>{props.customError}</h4>
        ) : undefined}
        <Form onFinish={(value) => props.formSubmitHandler(value)}>
          <Form.Item
            name="Url"
            rules={[
              { required: true, message: "Please input your freaky long url!" },
            ]}
          >
            <Input
              style={{
                width: "50%",
              }}
              type="text"
              placeholder="Enter the freaking long url"
              size="large"
            />
          </Form.Item>
          <div style={{ marginTop: "20px" }}>
            <Button
              size="large"
              type="primary"
              loading={props.loading}
              htmlType="submit"
            >
              {props.loading ? "" : "Shorten"}
            </Button>
          </div>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default urlForm;
