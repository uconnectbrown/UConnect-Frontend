// Setup
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles/";
import { createTheme } from "@material-ui/core/styles";
import themeFile from "./util/theme";

// Components
import AuthRoute from "./util/AuthRoute";

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

const theme = createTheme(themeFile);

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
              <Route exact path="/profileBuild" component={profileBuild} />
              <Route exact path="/profileView" component={profileView} />
              <Route exact path="/coursesView" component={coursesView} />
              <Route exact path="/messageView" component={messageView} />
              <Route exact path="/courseView" component={courseView} />
              <Route exact path="/studentView" component={studentView} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
