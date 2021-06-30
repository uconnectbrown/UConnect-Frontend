import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles/";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";

// Components
import NavBar from "./components/NavBar";
import AuthRoute from "./util/AuthRoute";

// Pages
import welcome from "./pages/welcome";
import login from "./pages/login";
import signup from "./pages/signup";
import profileBuild from "./pages/profileBuild";
import profileView from "./pages/profileView";

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={welcome} />
              <AuthRoute
                exact
                path="/login"
                component={login}
                authenticated={authenticated}
              />
              <AuthRoute
                exact
                path="/signup"
                component={signup}
                authenticated={authenticated}
              />
              <Route exact path="/profileBuild" component={profileBuild} />
              <Route exact path="/profileView" component={profileView} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
