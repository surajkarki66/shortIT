import React from "react";
import { Button, Input } from "antd";

interface Props {
  loading: boolean;
}

const urlForm: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
      <div className="search-bar">
        <h2 style={{ textTransform: "uppercase" }}>
          Short your freaking long URL
        </h2>
        <form>
          <Input
            style={{
              width: "50%",
            }}
            type="text"
            placeholder="Enter the freaking long url"
            size="large"
          />
        </form>
        <div style={{ marginTop: "20px" }}>
          <Button size="large" type="primary" loading={props.loading}>
            {props.loading ? "" : "Shorten"}
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default urlForm;
