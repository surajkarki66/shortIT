import Cookies from "js-cookie";
import React, { useState, useContext } from "react";
import { Drawer, Button } from "antd";
import { Link } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";

import "./Navbar.css";
import RightMenu from "./Sections/RightMenu";
import Logo from "../../../logo.svg";
import { UserContext } from "../../UserContext";

const NavBar: React.FC<RouteComponentProps> = (props) => {
  const [visible, setVisible] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(UserContext);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const logOut = () => {
    setIsAuthenticated(false);
    Cookies.remove("AccessToken");
    props.history.push("/");
  };
  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    logOut();
  };
  return (
    <nav
      className="menu"
      style={{ position: "fixed", zIndex: 1, width: "100%" }}
    >
      <div className="menu__logo">
        <Link to="/">
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "5px",
              border: "2 px solid",
            }}
          />
        </Link>
      </div>
      <Link to="/">
        <div className="menu__title">
          <h2>ShortIT</h2>
        </div>
      </Link>

      <div className="menu__container">
        <div className="menu_right">
          <RightMenu
            mode="horizontal"
            isAuthenticated={isAuthenticated}
            onClickHandler={onClickHandler}
          />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          MENU
        </Button>
        <Drawer
          title="MENU ITEMS"
          placement="right"
          className="menu_drawer"
          closable={true}
          onClose={onClose}
          visible={visible}
        >
          <RightMenu
            mode="inline"
            isAuthenticated={isAuthenticated}
            onClickHandler={onClickHandler}
          />
        </Drawer>
      </div>
    </nav>
  );
};

export default withRouter(NavBar);
