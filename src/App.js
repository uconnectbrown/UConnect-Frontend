// Setup
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles/";
import { createTheme } from "@material-ui/core/styles";
import themeFile from "./util/theme";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

// Authentication
import { auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

// Components
import AuthRoute from "./util/AuthRoute"; // auth => send to profileView, else send to component
import SignIn from "./components/SignIn";
import Welcome from "./components/Welcome";

// Pages
import profileBuild from "./pages/profileBuild";
import profileView from "./pages/profileView";
import coursesView from "./pages/coursesView";
import messageView from "./pages/messageView";
import courseView from "./pages/courseView";
import studentView from "./pages/studentView";
import messagesView from "./pages/messagesView";
import feedView from "./pages/feedView";
import groupMessageView from "./pages/groupMessageView";

// Styling
const theme = createTheme(themeFile);

// Body
function App() {
  const [user] = useAuthState(auth);
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        {user ? (
          <Router>
            <div className="container">
              <Switch>
                <Route exact path="/" component={Welcome} />
                <Route exact path="/profileBuild" component={profileBuild} />
                <Route exact path="/profileView" component={profileView} />
                <Route exact path="/coursesView" component={coursesView} />
                <Route exact path="/messageView" component={messageView} />
                <Route exact path="/courseView" component={courseView} />
                <Route exact path="/studentView" component={studentView} />
                <Route exact path="/messagesView" component={messagesView} />
                <Route exact path="/feedView" component={feedView} />
                <Route
                  exact
                  path="/groupMessageView"
                  component={groupMessageView}
                />
              </Switch>
            </div>
          </Router>
        ) : (
          <Router>
            <div className="container">
              <Switch>
                <Route exact path="/" component={Welcome} />
              </Switch>
            </div>
          </Router>
        )}
      </div>
    </MuiThemeProvider>
  );
}

export default App;
