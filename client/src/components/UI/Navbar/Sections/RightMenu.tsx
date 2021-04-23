import React from "react";
import { Menu } from "antd";
import {
  Link,
  RouteComponentProps,
  withRouter,
  useLocation,
} from "react-router-dom";
import { MenuMode } from "antd/lib/menu";
import { UserOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

interface Props extends RouteComponentProps {
  mode: MenuMode;
  authData: {
    token: string;
    userId: string;
    fullName: string;
  };
  logoutClickHandler: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const RightMenu: React.FC<Props> = (props) => {
  const location = useLocation();
  const { logoutClickHandler, mode, authData } = props;
  const { token, fullName, userId } = authData;

  let menu = (
    <Menu defaultSelectedKeys={[location.pathname]} mode={mode}>
      <Menu.Item key="/register" style={{ borderBottom: "none" }}>
        <Link to="/register">Register</Link>
      </Menu.Item>
      <Menu.Item key="/login" style={{ borderBottom: "none" }}>
        <Link to="/login">Login</Link>
      </Menu.Item>
    </Menu>
  );
  if (token) {
    menu = (
      <Menu mode={mode}>
        <SubMenu
          key="loggedInNav"
          icon={<UserOutlined />}
          title={fullName}
          style={{ borderBottom: "none", color: "white" }}
        >
          <Menu.Item key="profile_settings">
            <Link to={`${userId}/profile`}>Profile Settings</Link>
          </Menu.Item>
          <Menu.Item key="account_settings">
            <Link to="/account">Account Settings</Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <Link to="/" onClick={logoutClickHandler}>
              Log Out
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }

  return <React.Fragment>{menu}</React.Fragment>;
};

export default withRouter(RightMenu);
