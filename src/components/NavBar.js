// Setup
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import App from "../App.js";

// MUI Stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import SignOut from "./SignOut.js";

class NavBar extends Component {
  logoutUser = () => {
    localStorage.clear();
    delete axios.defaults.headers.common["Authorization"];
    <App authenticated={false} />;
  };

  render() {
    return (
      <AppBar color="secondary">
        <Toolbar className="nav-container">
          <Button color="inherit" component={Link} to="/profileView">
            Profile
          </Button>
          <Button color="inherit" component={Link} to="/coursesView">
            Courses
          </Button>
          <Button color="inherit" component={Link} to="/messagesView">
            Messages
          </Button>

          <SignOut />
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;
