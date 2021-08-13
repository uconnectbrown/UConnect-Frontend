// Setup
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles/";
import { createTheme } from "@material-ui/core/styles";
import themeFile from "./util/theme";

// Authentication
import { auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

// Components
import Welcome from "./components/Welcome";

// Pages
import profileBuild from "./pages/profileBuild";
import profileView from "./pages/profileView";
import Home from "./pages/Home";
import messageView from "./pages/messageView";
import courseView from "./pages/courseView";
import studentView from "./pages/studentView";
import messagesView from "./pages/messagesView";
import feedView from "./pages/feedView";
import groupMessageView from "./pages/groupMessageView";
import universityView from "./pages/universityView";

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
                <Route exact path="/" component={Home} />
                <Route exact path="/profileBuild" component={profileBuild} />
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
