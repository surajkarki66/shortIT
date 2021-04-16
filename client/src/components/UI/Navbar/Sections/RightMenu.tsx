import React from "react";
import { Menu } from "antd";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { MenuMode } from "antd/lib/menu";

interface Props extends RouteComponentProps {
  mode: MenuMode;
}

const RightMenu: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
      {" "}
      <Menu mode={props.mode}>
        <Menu.Item key="signup">
          <Link to="/register">Register</Link>
        </Menu.Item>
        <Menu.Item key="login">
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link to="/profile">Profile</Link>
        </Menu.Item>
      </Menu>
    </React.Fragment>
  );
};

export default withRouter(RightMenu);
