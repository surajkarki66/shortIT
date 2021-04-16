import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Navbar from "./components/UI/Navbar/Navbar";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default App;
