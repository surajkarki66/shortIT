import React from "react";
import { Navbar } from "react-bootstrap";

import logo from "../../logo.svg";

const NavBar: React.FC = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          ShortIT
        </Navbar.Brand>
      </Navbar>
    </>
  );
};

export default NavBar;
