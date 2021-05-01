import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/AuthContext";
const history = createBrowserHistory();
ReactDOM.render(
  <AuthContextProvider>
    <Router history={history}>
      <App />
    </Router>
  </AuthContextProvider>,
  document.getElementById("root")
);

reportWebVitals();
