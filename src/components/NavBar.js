// Setup
import React, { Component } from "react";
import { Link } from "react-router-dom";

// MUI Stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

class NavBar extends Component {
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
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;
