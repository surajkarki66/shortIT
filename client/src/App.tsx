import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import "./App.css";
import Navbar from "./components/UI/Navbar/Navbar";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CreateUrl from "./containers/Url/CreateUrl";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import { AuthContext } from "./context/AuthContext";

const App: React.FC = () => {
  const { token, userId } = useContext(AuthContext);

  let routes = (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/forgotPassword" component={ForgotPassword} />
      <Route
        exact
        path="/user/password-reset/:token"
        component={ResetPassword}
      />
      <Redirect to="/" />
    </Switch>
  );
  if (token) {
    routes = (
      <Switch>
        <Route exact path="/:userId" component={Home} />
        <Route exact path="/:userId/profile" component={Profile} />
        <Route exact path="/:userId/link/create" component={CreateUrl} />
        <Redirect to={`/${userId}`} />
      </Switch>
    );
  }
  return (
    <div
      style={{
        paddingTop: "69px",
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <Navbar />
      <div>{routes}</div>
    </div>
  );
};

export default App;
