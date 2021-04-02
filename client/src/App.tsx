import React from "react";
import { Container } from "react-bootstrap";

import "./App.css";
import NavBar from "./components/Navigation/NavBar";

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />
      <Container>
        <h1>Hello</h1>
      </Container>
    </div>
  );
};

export default App;
