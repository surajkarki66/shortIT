import React from "react";
import { Button, Menu } from "antd";
import {
  Link,
  RouteComponentProps,
  withRouter,
  useLocation,
} from "react-router-dom";
import { MenuMode } from "antd/lib/menu";

interface Props extends RouteComponentProps {
  mode: MenuMode;
  isAuthenticated: boolean;
}

const RightMenu: React.FC<Props> = (props) => {
  const location = useLocation();
  const { isAuthenticated } = props;
  let menu = (
    <Menu defaultSelectedKeys={[location.pathname]} mode={props.mode}>
      <Menu.Item key="/register">
        <Link to="/register">Register</Link>
      </Menu.Item>
      <Menu.Item key="/login">
        <Link to="/login">Login</Link>
      </Menu.Item>
    </Menu>
  );
  if (isAuthenticated) {
    menu = <Button type="primary">Logout</Button>;
  }

  return <React.Fragment>{menu}</React.Fragment>;
};

export default withRouter(RightMenu);
