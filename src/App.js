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
import Home from "./pages/Home";

// Styling
import 'bootstrap/dist/css/bootstrap.min.css';

const theme = createTheme(themeFile);

// Body
function App() {
  const [user] = useAuthState(auth);
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        {user ? (
          <Router>
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/profileBuild" component={profileBuild} />
            </Switch>
          </Router>
        ) : (
          <Router>
              <Switch>
                <Route exact path="/" component={Welcome} />
              </Switch>
          </Router>
        )}
      </div>
    </MuiThemeProvider>
  );
}

export default App;
