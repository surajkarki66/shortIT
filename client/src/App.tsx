import React, { useContext, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Axios from "./axios-url";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/UI/Navbar/Navbar";
import LandingPage from "./pages/LandingPage";
import Links from "./pages/Links";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Activate from "./pages/Activate";
import Account from "./pages/Account";
import EditUrl from "./containers/Url/EditUrl";
import { AuthContext } from "./context/AuthContext";
import CreateUrl from "./containers/Url/CreateUrl";

const App: React.FC = () => {
  const { setCsrfToken, token } = useContext(AuthContext);

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await Axios.get("/api/users/csrf-token");
      setCsrfToken(data.csrfToken);
    };
    getCsrfToken();
  }, [setCsrfToken]);
  const routes = (
    <Switch>
      {token && (
        <>
          <Route exact path="/" component={CreateUrl} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/account-setting" component={Account} />
          <Route exact path="/links" component={Links} />
          <Route exact path="/user/activate/:token" component={Activate} />
          <Route exact path="/link/edit/:urlId" component={EditUrl} />
        </>
      )}
      {!token && (
        <>
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
        </>
      )}
    </Switch>
  );

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
