import React from "react";

import UrlForm from "../components/UI/UrlForm/UrlForm";

const landingPage: React.FC = () => {
  return (
    <React.Fragment>
      <div className="landingPage">
        <UrlForm loading={false} />
      </div>
    </React.Fragment>
  );
};

export default landingPage;
