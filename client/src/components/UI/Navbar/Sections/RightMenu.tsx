import React, { useState } from "react";
import { Menu } from "antd";
import {
  Link,
  RouteComponentProps,
  withRouter,
  useLocation,
} from "react-router-dom";
import { MenuMode } from "antd/lib/menu";

interface Props extends RouteComponentProps {
  mode: MenuMode;
}

const RightMenu: React.FC<Props> = (props) => {
  const location = useLocation();

  return (
    <React.Fragment>
      {" "}
      <Menu defaultSelectedKeys={[location.pathname]} mode={props.mode}>
        <Menu.Item key="/register">
          <Link to="/register">Register</Link>
        </Menu.Item>
        <Menu.Item key="/login">
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="/profile">
          <Link to="/profile">Profile</Link>
        </Menu.Item>
      </Menu>
    </React.Fragment>
  );
};

export default withRouter(RightMenu);
