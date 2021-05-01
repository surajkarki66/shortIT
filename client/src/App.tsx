import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/UI/Navbar/Navbar";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CreateUrl from "./containers/Url/CreateUrl";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Activate from "./pages/Activate";
import Account from "./pages/Account";
import EditUrl from "./containers/Url/EditUrl";
import { AuthContext } from "./context/AuthContext";

const App: React.FC = () => {
  const { token } = useContext(AuthContext);

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
      <Route exact path="/user/activate/:token" component={Activate} />
      <Redirect to="/" />
    </Switch>
  );
  if (token) {
    routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/account-setting" component={Account} />
        <Route exact path="/link/create" component={CreateUrl} />
        <Route exact path="/user/activate/:token" component={Activate} />
        <Route exact path="/link/edit/:urlId" component={EditUrl} />
        <Redirect to="/" />
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
      {routes}
      <Footer />
    </div>
  );
};

export default App;
