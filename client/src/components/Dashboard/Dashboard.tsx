import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, SettingOutlined } from "@ant-design/icons";

import { Switch, Route } from "react-router-dom";

const { Sider, Content } = Layout;

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={["profile"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key="profile" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="setting" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <div style={{ padding: 24, background: "#fff", textAlign: "center" }}>
            <Switch>
              <Route
                path="/dashboard/profile"
                component={() => <h1>Profile</h1>}
                exact
              />
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
