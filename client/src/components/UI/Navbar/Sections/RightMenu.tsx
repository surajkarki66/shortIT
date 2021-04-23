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
  token: string;
  logoutClickHandler: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  fullName: string;
}

const RightMenu: React.FC<Props> = (props) => {
  const location = useLocation();
  const { logoutClickHandler, token, fullName } = props;
  let menu = (
    <Menu defaultSelectedKeys={[location.pathname]} mode={props.mode}>
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
      <Menu mode={props.mode}>
        <SubMenu
          key="loggedInNav"
          icon={<UserOutlined />}
          title={fullName}
          style={{ borderBottom: "none", color: "white" }}
        >
          <Menu.Item key="profile_settings">Profile Settings</Menu.Item>
          <Menu.Item key="account_settings">Account Settings</Menu.Item>
          <Menu.Item key="logout">
            <Link to="/" onClick={logoutClickHandler}>
              Log Out
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>

      // <Button type="primary" onClick={onClickHandler}>
      //   Logout
      // </Button>
    );
  }

  return <React.Fragment>{menu}</React.Fragment>;
};

export default withRouter(RightMenu);
