import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import "./App.css";
import Navbar from "./components/UI/Navbar/Navbar";

import Dashboard from "./components/Dashboard/Dashboard";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { AuthContext } from "./context/AuthContext";

const App: React.FC = () => {
  const { loggedIn } = useContext(AuthContext);
  let routes = (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Redirect to="/" />
    </Switch>
  );
  if (loggedIn) {
    routes = (
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Redirect to="/dashboard" />
      </Switch>
    );
  }
  return (
    <React.Fragment>
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Navbar />
        {routes}
      </div>
    </React.Fragment>
  );
};

export default App;
