import React from "react";
import { Menu, Button } from "antd";
import {
  Link,
  RouteComponentProps,
  withRouter,
  useLocation,
} from "react-router-dom";
import { UserOutlined, LinkOutlined, LoadingOutlined } from "@ant-design/icons";
import { MenuMode } from "antd/lib/menu";

const { SubMenu } = Menu;

interface Props extends RouteComponentProps {
  mode?: MenuMode;
  authData: {
    token?: string;
    loading: boolean;
  };
  fullName: string;
  logoutClickHandler: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const RightMenu: React.FC<Props> = (props) => {
  const location = useLocation();

  const { logoutClickHandler, mode, authData, fullName } = props;
  const { token, loading } = authData;

  return (
    <React.Fragment>
      {token && (
        <Menu defaultSelectedKeys={[location.pathname]} mode={mode}>
          <Menu.Item key="create" style={{ borderBottom: "none" }}>
            {fullName && (
              <Button type="primary">
                <Link to="/links">
                  <LinkOutlined />
                  Links
                </Link>
              </Button>
            )}
          </Menu.Item>
          <SubMenu
            key="/"
            icon={fullName ? <UserOutlined /> : <LoadingOutlined />}
            title={fullName ? fullName : null}
            style={{ color: "#87ceeb" }}
          >
            <Menu.Item key="profile_settings">
              <Link to="/profile">Profile Settings</Link>
            </Menu.Item>
            <Menu.Item key="account_settings">
              <Link to="/account-setting">Account Settings</Link>
            </Menu.Item>
            <Menu.Item key="logout">
              <Link to="/" onClick={logoutClickHandler}>
                Log Out
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      )}
      {!token && !loading && (
        <Menu defaultSelectedKeys={[location.pathname]} mode={mode}>
          <Menu.Item key="register" style={{ borderBottom: "none" }}>
            <Link to="/register">Register</Link>
          </Menu.Item>
          <Menu.Item key="login" style={{ borderBottom: "none" }}>
            <Link to="/login">Login</Link>
          </Menu.Item>
        </Menu>
      )}
    </React.Fragment>
  );
};

export default withRouter(RightMenu);
