// Setup
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles/";
import { createTheme } from "@material-ui/core/styles";
import themeFile from "./util/theme";

// Components
import AuthRoute from "./util/AuthRoute"; // auth => send to profileView, else send to component

// Pages
import welcome from "./pages/welcome";
import login from "./pages/login";
import signup from "./pages/signup";
import profileBuild from "./pages/profileBuild";
import profileView from "./pages/profileView";
import coursesView from "./pages/coursesView";
import messageView from "./pages/messageView";
import courseView from "./pages/courseView";
import studentView from "./pages/studentView";
import messagesView from "./pages/messagesView";
import feedView from "./pages/feedView";

// Styling
const theme = createTheme(themeFile);

// Body
let auth;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    auth = false;
  } else {
    auth = true;
  }
}

function App(props) {
  let authenticated = auth;
  if (!props.authenticated) {
    authenticated = props.authenticated;
  }
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <div className="container">
            <Switch>
              <AuthRoute
                exact
                path="/"
                component={welcome}
                authenticated={authenticated}
              />
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
              <Route
                exact
                path="/profileBuild"
                component={profileBuild}
                authenticated={authenticated}
              />
              <Route
                exact
                path="/profileView"
                component={profileView}
                authenticated={authenticated}
              />
              <Route
                exact
                path="/coursesView"
                component={coursesView}
                authenticated={authenticated}
              />
              <Route
                exact
                path="/messageView"
                component={messageView}
                authenticated={authenticated}
              />
              <Route
                exact
                path="/courseView"
                component={courseView}
                authenticated={authenticated}
              />
              <Route
                exact
                path="/studentView"
                component={studentView}
                authenticated={authenticated}
              />
              <Route
                exact
                path="/messagesView"
                component={messagesView}
                authenticated={authenticated}
              />
              <Route
                exact
                path="/feedView"
                component={feedView}
                authenticated={authenticated}
              />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
