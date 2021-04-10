import React, { useState } from "react";
import { Drawer, Button } from "antd";

import "./Navbar.css";
import RightMenu from "./Sections/RightMenu";
import Logo from "../../../logo.svg";

const NavBar: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <nav
      className="menu"
      style={{ position: "fixed", zIndex: 1, width: "100%" }}
    >
      <div className="menu__logo">
        <a href="/">
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
        </a>
      </div>
      <a href="/">
        <div className="menu__title">
          <h2>ShortIT</h2>
        </div>
      </a>

      <div className="menu__container">
        <div className="menu_right">
          <RightMenu mode="horizontal" />
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
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  );
};

export default NavBar;
