import React from "react";

import "./App.css";
import Navbar from "./components/UI/Navbar/Navbar";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Navbar />
      </div>
    </React.Fragment>
  );
};

export default App;
