// Setup
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

// MUI Stuff
import Button from "@material-ui/core/Button";

class welcome extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to UConnect!</h1>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/login"
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/signup"
        >
          Signup
        </Button>
      </div>
    );
  }
}

export default welcome;
