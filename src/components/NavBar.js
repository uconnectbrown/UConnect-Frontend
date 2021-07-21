// Setup
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import App from "../App.js";

// MUI Stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

class NavBar extends Component {
  // TO-DO: figure out reloading bug
  logoutUser = () => {
    localStorage.clear();
    delete axios.defaults.headers.common["Authorization"];
    <App authenticated={false} />;
  };

  render() {
    return (
      <AppBar>
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
          <Button
            color="inherit"
            onClick={this.logoutUser}
            component={Link}
            to="/"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;
