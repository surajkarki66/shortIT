import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import "./App.css";
import Navbar from "./components/UI/Navbar/Navbar";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { AuthContext } from "./context/AuthContext";

const App: React.FC = () => {
  const { token, userId } = useContext(AuthContext);
  let routes = (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Redirect to="/" />
    </Switch>
  );
  if (token) {
    routes = (
      <Switch>
        <Route exact path="/:userId/links" component={Home} />
        <Route exact path="/profile" />
        <Route exact path="/profile" />
        <Redirect to={`/${userId}/links`} />
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
